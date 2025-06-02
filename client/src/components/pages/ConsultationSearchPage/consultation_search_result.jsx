import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"; // Update path as needed
import { Link, useSearchParams } from "react-router-dom";

// Mock doctor data
const doctors = Array.from({ length: 10 }).map((_, index) => ({
  id: index + 1,
  name: `Dr. John Doe ${index + 1}`,
  fees: 50 + index * 5,
  experience: 5 + index,
  specialist: 'Cardiologist',
  image: 'https://via.placeholder.com/150',
  online: index % 2 === 0,
  availableToday: index % 3 === 0,
  availableNext2Hours: index % 4 === 0,
  isFree: index % 5 === 0,
}));

const ITEMS_PER_PAGE = 6;

export default function ConsultationSearchResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const sort = searchParams.get("sort") || "Relevance";
  const experience = searchParams.get("experience") || "Any";

  const checkboxFilters = {
    online: searchParams.get("online") === "true",
    today: searchParams.get("today") === "true",
    next2hr: searchParams.get("next2hr") === "true",
    free: searchParams.get("free") === "true",
  };

  // Apply filters and sort
  const filteredDoctors = useMemo(() => {
    let filtered = [...doctors];

    // Experience Filter
    if (experience === "1-3 Years") {
      filtered = filtered.filter(d => d.experience >= 1 && d.experience <= 3);
    } else if (experience === "3-5 Years") {
      filtered = filtered.filter(d => d.experience >= 3 && d.experience <= 5);
    } else if (experience === "5+ Years") {
      filtered = filtered.filter(d => d.experience > 5);
    }

    // Checkbox Filters
    if (checkboxFilters.online) {
      filtered = filtered.filter(d => d.online);
    }
    if (checkboxFilters.today) {
      filtered = filtered.filter(d => d.availableToday);
    }
    if (checkboxFilters.next2hr) {
      filtered = filtered.filter(d => d.availableNext2Hours);
    }
    if (checkboxFilters.free) {
      filtered = filtered.filter(d => d.isFree);
    }

    // Sorting
    switch (sort) {
      case "Fees: low to high":
        filtered.sort((a, b) => a.fees - b.fees);
        break;
      case "Fees: high to low":
        filtered.sort((a, b) => b.fees - a.fees);
        break;
      case "Experience":
        filtered.sort((a, b) => b.experience - a.experience);
        break;
      case "Specialist First":
        filtered.sort((a, b) => a.specialist.localeCompare(b.specialist));
        break;
      default:
        break;
    }

    return filtered;
  }, [experience, sort, checkboxFilters]);

  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDoctors = filteredDoctors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="p-4 space-y-6">
      {/* Search & Filter Button */}
      <div className="flex justify-between items-center">
        <div className="w-full max-w-xl relative">
          <input
            type="text"
            placeholder="Search by doctor name or diagnosis"
            className="w-full border rounded px-4 py-2 pl-10 shadow-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="ml-4 md:hidden">
          <Drawer>
            <DrawerTrigger className="flex items-center gap-1 px-3 py-2 border rounded text-sm shadow-sm">
              <SlidersHorizontal size={18} />
              Filter
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filter Doctors</DrawerTitle>
              </DrawerHeader>
              <DoctorFilters searchParams={searchParams} setSearchParams={setSearchParams} />
              <div className="p-4">
                <DrawerClose className="w-full bg-blue-500 text-white py-2 rounded">Close</DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {currentDoctors.map((doctor) => (
          <Link to={'/user_consultation/doctor'} key={doctor.id} className="border border-blue-500 rounded-lg p-4 shadow-md flex gap-4 items-center">
            <img src={doctor.image} alt={doctor.name} className="md:w-20 md:h-20 w-16 h-16 rounded-full object-cover" />
            <div className="text-left">
              <p className="text-sm font-semibold line-clamp-1">{doctor.name}</p>
              <p className="text-gray-600 text-xs">Fees: ${doctor.fees}</p>
              <p className="text-gray-600 text-xs">Experience: {doctor.experience} Years</p>
              <p className="text-gray-600 text-xs line-clamp-1">Specialist: {doctor.specialist}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}



const DoctorFilters = ({ searchParams, setSearchParams }) => {
  const handleChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handleCheckbox = (key, checked) => {
    const newParams = new URLSearchParams(searchParams);
    if (checked) {
      newParams.set(key, "true");
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="p-4 border rounded-lg w-full space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Filter</h2>
        <div className="space-y-2">

          {/* Sort Dropdown */}
          <div>
            <label className="block font-medium">Sort by</label>
            <select
              value={searchParams.get("sort") || "Relevance"}
              onChange={(e) => handleChange("sort", e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option>Relevance</option>
              <option>Fees: low to high</option>
              <option>Fees: high to low</option>
              <option>Experience</option>
              <option>Specialist First</option>
            </select>
          </div>

          {/* Experience Filter */}
          <div>
            <label className="block font-medium">Experience</label>
            <select
              value={searchParams.get("experience") || "Any"}
              onChange={(e) => handleChange("experience", e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option>Any</option>
              <option>1-3 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>

          {/* Checkboxes */}
          <div className="space-y-1 text-sm text-gray-700">
            {[
              { label: "Online Now", key: "online" },
              { label: "Available next 2 hours", key: "next2hr" },
              { label: "Available Today", key: "today" },
              { label: "Free Doctors", key: "free" },
            ].map(({ label, key }) => (
              <div key={key}>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={searchParams.get(key) === "true"}
                  onChange={(e) => handleCheckbox(key, e.target.checked)}
                />
                {label}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
