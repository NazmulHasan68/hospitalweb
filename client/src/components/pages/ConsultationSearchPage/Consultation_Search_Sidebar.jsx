import React, { useState, useEffect } from "react";

export default function Consultation_Search_Sidebar() {
  // State for filters
  const [price, setPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("Relevance");
  const [experience, setExperience] = useState("Any");
  const [filters, setFilters] = useState({
    onlineNow: false,
    available2hr: false,
    availableToday: false,
    freeDoctors: false,
  });

  // Update URL query params on filter change
  useEffect(() => {
    const params = new URLSearchParams();

    if (price) {
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

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    
    // Update the browser URL without reloading page
    window.history.replaceState(null, "", newUrl);
  }, [price, sortBy, experience, filters]);

  const toggleCheckbox = (name) => {
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="p-4 hidden md:block border rounded-lg w-full max-w-xs space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Filter</h2>
        <div className="space-y-4">
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
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
          </div>

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

          <div className="space-y-1">
            {["onlineNow", "available2hr", "availableToday", "freeDoctors"].map(
              (key) => (
                <div key={key}>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={filters[key]}
                      onChange={() => toggleCheckbox(key)}
                      className="mr-2"
                    />
                    {key === "onlineNow"
                      ? "Online Now"
                      : key === "available2hr"
                      ? "Available next 2 hours"
                      : key === "availableToday"
                      ? "Available Today"
                      : "Free Doctors"}
                  </label>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
