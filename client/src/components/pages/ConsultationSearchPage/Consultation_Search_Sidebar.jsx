import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Consultation_Search_Sidebar() {
  const [searchParams, setSearchParams] = useSearchParams();



  // Initialize states from URL params or defaults
  const [price, setPrice] = useState(() => {
    const p = searchParams.get("maxPrice");
    return p ? Number(p) : 5000;
  });

  const [sortBy, setSortBy] = useState(() => {
    const s = searchParams.get("sortBy");
    return s
      ? s
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()) // Capitalize words
      : "Relevance";
  });

  const [experience, setExperience] = useState(() => searchParams.get("experience") || "Any");

  const [filters, setFilters] = useState(() => ({
    isActive: searchParams.get("isActive") === "true",       // FIXED typo: was isAcitive
    next2hr: searchParams.get("next2hr") === "true",
    isAvailableToday: searchParams.get("isAvailableToday") === "true",
    isFree: searchParams.get("isFree") === "true",
  }));

  // Update URL query params when state changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (price && price !== 5000) {
      params.set("maxPrice", price);
    }

    if (sortBy && sortBy !== "Relevance") {
      params.set("sortBy", sortBy.toLowerCase().replace(/\s+/g, "_"));
    }

    if (experience && experience !== "Any") {
      params.set("experience", experience);
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, "true");
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params, { replace: true });
  }, [price, sortBy, experience, filters, setSearchParams]);

  // Toggle checkbox state
  const toggleCheckbox = (name) => {
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="p-4 hidden md:block h-screen border rounded-lg w-full max-w-xs space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Filter</h2>
        <div className="space-y-4">
          {/* Price Range */}
          <div>
            <label htmlFor="price-range" className="block font-medium mb-1">
              Price (up to ${price})
            </label>
            <input
              id="price-range"
              type="range"
              min="0"
              max="5000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Sort by */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Sort by</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option>Relevance</option>
              <option>Popularity</option>
              <option>Fees: low to high</option>
              <option>Fees: high to low</option>
              <option>Experience</option>
              <option>Specialist First</option>
            </select>
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className="block font-medium mb-1">
              Experience
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option>Any</option>
              <option>1-3 Years</option>
              <option>3-5 Years</option>
              <option>5+ Years</option>
            </select>
          </div>

          {/* Checkbox Filters */}
          <div className="space-y-1">
            {[
              { key: "isActive", label: "Online Now" },     
              { key: "next2hr", label: "Available next 2 hours" },
              { key: "isAvailableToday", label: "Available Today" },
              { key: "isFree", label: "Free Doctors" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={() => toggleCheckbox(key)}
                    className="mr-2"
                  />
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
