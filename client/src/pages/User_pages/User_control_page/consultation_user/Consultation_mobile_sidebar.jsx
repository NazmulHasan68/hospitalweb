import React, { useState, useEffect } from "react";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { doctorcategory } from "@/components/Common/data";
import { Link } from "react-router-dom";

export default function Consultation_mobile_sidebar({ searchParams, setSearchParams }) {
  // Extract category to local state for consistent controlled select
  const [category, setCategory] = useState(searchParams.get("category") || "");

  const [price, setPrice] = useState(Number(searchParams.get("maxPrice")) || 5000);
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") ? searchParams.get("sortBy").replace(/_/g, " ") : "Relevance"
  );
  const [experience, setExperience] = useState(searchParams.get("experience") || "Any");
  const [filters, setFilters] = useState({
    isActive: searchParams.get("isActive") === "true",
    next2hr: searchParams.get("next2hr") === "true",
    isAvailableToday: searchParams.get("isAvailableToday") === "true",
    isFree: searchParams.get("isFree") === "true",
  });

  const [open, setOpen] = useState(false);

  // Sync category if URL changes externally
  useEffect(() => {
    const catFromUrl = searchParams.get("category") || "";
    if (catFromUrl !== category) {
      setCategory(catFromUrl);
    }
  }, [searchParams, category]);

  // Sync other filters if URL changes externally
  useEffect(() => {
    setPrice(Number(searchParams.get("maxPrice")) || 5000);
    setSortBy(
      searchParams.get("sortBy") ? searchParams.get("sortBy").replace(/_/g, " ") : "Relevance"
    );
    setExperience(searchParams.get("experience") || "Any");
    setFilters({
      isActive: searchParams.get("isActive") === "true",
      next2hr: searchParams.get("next2hr") === "true",
      isAvailableToday: searchParams.get("isAvailableToday") === "true",
      isFree: searchParams.get("isFree") === "true",
    });
  }, [searchParams]);

  // Update URL params on local state change (except searchParams to avoid loop)
  useEffect(() => {
    const params = new URLSearchParams();

    if (price && price !== 5000) params.set("maxPrice", price);
    else params.delete("maxPrice");

    if (sortBy && sortBy.toLowerCase() !== "relevance")
      params.set("sortBy", sortBy.toLowerCase().replace(/\s+/g, "_"));
    else params.delete("sortBy");

    if (experience && experience !== "Any") params.set("experience", experience);
    else params.delete("experience");

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, "true");
      else params.delete(key);
    });

    if (category) params.set("category", category);
    else params.delete("category");

    setSearchParams(params, { replace: true });

    setOpen(false); // close drawer when filters change
  }, [price, sortBy, experience, filters, category, setSearchParams]);

  const toggleCheckbox = (name) => {
    setFilters((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="md:hidden">Filters</Button>
      </DrawerTrigger>

      <DrawerContent className="w-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Link to={"/user_consultation/search"} className="font-semibold border px-3 py-1 rounded-md">
            Refresh
          </Link>
          <DrawerClose asChild>
            <button aria-label="Close filters" className="text-gray-600 hover:text-gray-900">
              ✕
            </button>
          </DrawerClose>
        </div>

        <div className="space-y-6">
          {/* Category */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Select Category</option>
              {doctorcategory.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="sort-by" className="block font-medium mb-1">
              Sort by
            </label>
            <select
              id="sort-by"
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
      </DrawerContent>
    </Drawer>
  );
}
