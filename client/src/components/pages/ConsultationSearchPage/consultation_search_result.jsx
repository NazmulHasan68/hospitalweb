import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import Consultation_mobile_sidebar from "@/pages/User_pages/User_control_page/consultation_user/Consultation_mobile_sidebar";
import {
  useGetConsultationsQuery,
  useSearchConsultationsQuery,
} from "@/redux/ApiController/consaltaionAPi";

const ITEMS_PER_PAGE = 9;

export default function Consultation_search_result() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getBooleanParam = (key) =>
    searchParams.get(key) === "true" ? true : undefined;

  const q = searchParams.get("q") || "";
  const isActive = getBooleanParam("isActive");
  const isFree = getBooleanParam("isFree");
  const isAvailableToday = getBooleanParam("isAvailableToday");
  const next2hr = getBooleanParam("next2hr");
  const price = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const experience = searchParams.get("experience") || undefined;
  const category = searchParams.get("category") || undefined;
  const currentPage = Number(searchParams.get("page")) || 1;

  const [page, setPage] = useState(currentPage);
  const [searchInput, setSearchInput] = useState(q);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [q, isActive, isFree, isAvailableToday, next2hr, price, sortBy, experience, category]);

  // Update URL when page changes
  useEffect(() => {
    if (page !== currentPage) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      setSearchParams(params, { replace: true });
    }
  }, [page]);

  // Sync currentPage when coming from URL
  useEffect(() => {
    if (page !== currentPage) setPage(currentPage);
  }, [currentPage]);

  // Sync searchInput when q changes
  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  // Debounced search input to update URL param "q"
  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmed = searchInput.trim();
      const params = new URLSearchParams(searchParams);

      if (trimmed) {
        params.set("q", trimmed);
      } else {
        params.delete("q");
      }

      params.set("page", "1");
      setSearchParams(params, { replace: false });
    }, 10000);

    return () => clearTimeout(handler);
  }, [searchInput]);

  // Query params for server search
  const queryParams = {
    q: q || undefined,
    isActive,
    isFree,
    isAvailableToday,
    next2hr,
    maxPrice: price,
    sortBy,
    experience,
    category,
    page,
    limit: ITEMS_PER_PAGE,
  };

  // Remove undefined keys from queryParams
  Object.keys(queryParams).forEach(
    (key) => queryParams[key] === undefined && delete queryParams[key]
  );

  const hasFiltersOrQuery =
    Boolean(q?.trim()) ||
    isActive === true ||
    isFree === true ||
    isAvailableToday === true ||
    next2hr === true ||
    typeof price === "number" ||
    !!sortBy ||
    !!experience ||
    !!category;

  // Fetch filtered results from server
  const {
    data: searchResult = { data: [], totalCount: 0 },
    isLoading: isSearching,
    error: searchError,
  } = useSearchConsultationsQuery(queryParams, { skip: !hasFiltersOrQuery });

  // Fetch all doctors if no filters/search
  const {
    data: allDoctors = [],
    isLoading: isLoadingAll,
    error: loadError,
  } = useGetConsultationsQuery(undefined, { skip: hasFiltersOrQuery });

  // Local filtering by name or phone when no server filters/query
  const filteredAllDoctors =
    !hasFiltersOrQuery && searchInput.trim() !== ""
      ? allDoctors.filter((doc) => {
          const lowerSearch = searchInput.trim().toLowerCase();
          const nameMatch = doc.name?.toLowerCase().includes(lowerSearch);
          const phoneMatch = doc.phone?.toLowerCase().includes(lowerSearch);
          return nameMatch || phoneMatch;
        })
      : allDoctors;

  // Choose doctors to display based on filtering mode
  const doctors = hasFiltersOrQuery ? searchResult.data || [] : filteredAllDoctors;

  const totalCount = hasFiltersOrQuery
    ? searchResult.totalCount || 0
    : filteredAllDoctors.length;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (isSearching || isLoadingAll) {
    return <p className="p-4 text-center">Loading doctors…</p>;
  }

  if (searchError || loadError) {
    return (
      <p className="p-4 text-center text-red-600" role="alert">
        Error loading doctors.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4 space-y-6">
      <div className="flex gap-4 justify-between items-center">
        <div className="relative w-full max-w-xl">
          <label htmlFor="search-input" className="sr-only">
            Search Doctors
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Search by doctor name, phone or diagnosis"
            className="w-full border rounded px-4 py-2 pl-10 shadow-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // Just update state here
            autoComplete="off"
            aria-label="Search doctors"
          />
          <Search
            className="absolute left-3 top-2.5 text-gray-400"
            size={20}
            aria-hidden="true"
          />
        </div>

        <Consultation_mobile_sidebar
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      <p className="text-sm text-gray-600">
        {totalCount} doctor{totalCount !== 1 ? "s" : ""} found
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {doctors.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No doctors found.
          </p>
        ) : (
          doctors.map((doc) => (
            <Link
              key={doc._id || doc.id}
              to={`/user_consultation/doctor/${doc._id}`}
              state={{ doctor: doc }}
              className="flex items-center gap-4 border rounded-lg p-2 shadow hover:shadow-lg transition relative"
            >
              <img
                src={`${import.meta.env.VITE_BASE_URL}/public/doctor/${doc.photo}`}
                alt={doc.name}
                className="w-16 h-16 rounded-2xl object-cover"
                loading="lazy"
              />
              <div>
                <h3 className="font-semibold line-clamp-1 mt-3 text-gray-800">
                  {doc.name}
                </h3>
                <p className="text-xs text-gray-600">
                  Specialist:{" "}
                  <span className="font-bold">
                    {doc.specialization ?? "N/A"}
                  </span>
                </p>
                <p className="text-xs text-gray-600">
                  Exp: {doc.experience ?? "N/A"} yrs
                </p>
                <p className="text-xs text-gray-600">
                  Time:{" "}
                  <span className="font-semibold">
                    {doc.checkupStartTime && doc.checkupEndTime
                      ? `${doc.checkupStartTime} - ${doc.checkupEndTime}`
                      : "N/A"}
                  </span>
                </p>
              </div>
              <div
                className={`absolute top-1 right-1 px-2 py-1 rounded-3xl text-xs font-medium ${
                  doc.isActive
                    ? "bg-emerald-200 text-emerald-900"
                    : "bg-red-200 text-red-900"
                }`}
                aria-label={doc.isActive ? "Online" : "Offline"}
              >
                {doc.isActive ? "Online" : "Offline"}
              </div>
              {doc.fees && (
                <p className="absolute bottom-1 right-2 text-sm font-bold">
                  {doc.fees}Tk
                </p>
              )}
            </Link>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <nav
          className="flex justify-center gap-4 mt-4"
          aria-label="Pagination Navigation"
        >
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            aria-disabled={page === 1}
            aria-label="Previous page"
          >
            Prev
          </button>

          <span className="text-sm" aria-live="polite">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
            aria-disabled={page === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
