import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  useGetConsultationsQuery,
  useSearchConsultationsQuery,
} from '@/redux/ApiController/consaltaionAPi';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import DoctorFilters from './DoctorFilters';

const ITEMS_PER_PAGE = 9;

export default function Consultation_search_result() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read query & filters from URL params
  const query = searchParams.get('query') || '';
  const maxPrice = Number(searchParams.get('maxPrice')) || 5000;
  const sort = searchParams.get('sortBy')?.replace(/_/g, ' ') || 'Relevance';
  const experience = searchParams.get('experience') || 'Any';
  const checkboxFilters = {
    isActive: searchParams.get('isActive') === 'true',
    isAvailableToday: searchParams.get('isAvailableToday') === 'true',
    next2hr: searchParams.get('next2hr') === 'true',
    isFree: searchParams.get('isFree') === 'true',
  };

  // Local state for search input and manualSearch flag to prevent unwanted resets
  const [searchInput, setSearchInput] = useState(query);
  const [manualSearch, setManualSearch] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [searchParams]); // reset page on filter/search change

  // Sync searchInput with URL param query unless manualSearch (typing)
  useEffect(() => {
    if (!manualSearch) setSearchInput(query);
    setManualSearch(false);
  }, [query, manualSearch]);

  // Data fetching hooks
  const {
    data: searchedDoctors = [],
    isLoading: isSearching,
    error: searchError,
  } = useSearchConsultationsQuery(query.trim(), { skip: !query.trim() });

  const {
    data: allDoctors = [],
    isLoading: isLoadingAll,
    error: loadError,
  } = useGetConsultationsQuery(undefined, { skip: !!query.trim() });

  const doctors = query.trim() ? searchedDoctors : allDoctors;

  // Filter and sort doctors according to filters from URL
  const filteredDoctors = useMemo(() => {
    let out = [...doctors];

    // Filter by search query (redundant but safe)
    if (query) {
      const q = query.toLowerCase();
      out = out.filter(
        (d) =>
          (d.name || '').toLowerCase().includes(q) ||
          (d.diagnosis || '').toLowerCase().includes(q)
      );
    }

    // Experience filter
    if (experience === '1-3 Years')
      out = out.filter(d => d.experience >= 1 && d.experience <= 3);
    else if (experience === '3-5 Years')
      out = out.filter(d => d.experience >= 3 && d.experience <= 5);
    else if (experience === '5+ Years')
      out = out.filter(d => d.experience > 5);

    // Price filter
    out = out.filter(d => (d.fees ?? 0) <= maxPrice);

    // Checkbox filters
    if (checkboxFilters.isActive) out = out.filter(d => d.isActive);
    if (checkboxFilters.isAvailableToday) out = out.filter(d => d.isAvailableToday);
    if (checkboxFilters.next2hr) out = out.filter(d => d.next2hr);
    if (checkboxFilters.isFree) out = out.filter(d => d.isFree);

    // Sorting
    switch (sort) {
      case 'Fees: low to high':
        out.sort((a, b) => (a.fees || 0) - (b.fees || 0));
        break;
      case 'Fees: high to low':
        out.sort((a, b) => (b.fees || 0) - (a.fees || 0));
        break;
      case 'Experience':
        out.sort((a, b) => (b.experience || 0) - (a.experience || 0));
        break;
      case 'Specialist First':
        out.sort((a, b) =>
          (a.specialist || '').localeCompare(b.specialist || '')
        );
        break;
      default:
        break;
    }

    return out;
  }, [doctors, query, experience, maxPrice, sort, checkboxFilters]);

  // Pagination slice
  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentPageDoctors = filteredDoctors.slice(start, start + ITEMS_PER_PAGE);

  // Handlers for search input change and enter key press
  const onSearchChange = (e) => setSearchInput(e.target.value);
  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const q = searchInput.trim();
      const newParams = new URLSearchParams(searchParams.toString());
      if (q) newParams.set('query', q);
      else newParams.delete('query');

      setManualSearch(true);
      setSearchParams(newParams);
    }
  };

  // Loading and error states
  if (isSearching || isLoadingAll)
    return <p className="p-4 text-center">Loading doctors…</p>;

  if (searchError || loadError)
    return <p className="p-4 text-center text-red-600">Error loading doctors.</p>;

  return (
    <div className="mx-auto max-w-7xl p-4 space-y-6">
      {/* Search Bar + Mobile Filter Drawer */}
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-xl">
          <input
            className="w-full border rounded px-4 py-2 pl-10 shadow-sm"
            placeholder="Search by doctor name or diagnosis"
            value={searchInput}
            onChange={onSearchChange}
            onKeyDown={onKeyDown}
            autoComplete="off"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        {/* Mobile Filter Drawer */}
        <div className="ml-4 md:hidden">
          <Drawer>
            <DrawerTrigger className="flex items-center px-3 py-2 border rounded text-sm">
              <SlidersHorizontal size={18} /> Filter
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filter Doctors</DrawerTitle>
              </DrawerHeader>
              <DoctorFilters
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
              <div className="p-4">
                <DrawerClose className="w-full bg-blue-500 text-white py-2 rounded">
                  Close
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentPageDoctors.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No doctors found.</p>
        ) : (
          currentPageDoctors.map((doc) => (
            <Link
              key={doc._id || doc.id}
              to="/user_consultation/doctor"
              state={{ doctor: doc }}
              className="flex items-center gap-4 border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}/public/doctor/${doc.photo}`}
                alt={doc.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold line-clamp-1">{doc.name}</h3>
                <p className="text-xs text-gray-600">Fees: ${doc.fees ?? 'N/A'}</p>
                <p className="text-xs text-gray-600">Exp: {doc.experience ?? 'N/A'} yrs</p>
                <p className="text-xs text-gray-600 line-clamp-1">Spec: {doc.specialist || 'N/A'}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
