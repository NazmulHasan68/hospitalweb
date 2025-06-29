import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function DoctorFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === 'Any' || value === 'Relevance') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const handleCheckbox = (key, checked) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (checked) {
      newParams.set(key, 'true');
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const checkboxOptions = [
    { label: 'Online Now', key: 'isActive' },
    { label: 'Available next 2 hours', key: 'next2hr' },
    { label: 'Available Today', key: 'isAvailableToday' },
    { label: 'Free Doctors', key: 'isFree' },
  ];

  return (
    <div className="p-4 border rounded-lg w-full space-y-6">
      <h2 className="text-lg font-semibold">Filter Doctors</h2>

      {/* Sort Select */}
      <div className="space-y-1">
        <label htmlFor="sort-select" className="block font-medium">
          Sort by
        </label>
        <select
          id="sort-select"
          className="w-full border rounded px-2 py-1"
          value={searchParams.get('sort') || 'Relevance'}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          <option>Relevance</option>
          <option>Fees: low to high</option>
          <option>Fees: high to low</option>
          <option>Experience</option>
          <option>Specialist First</option>
        </select>
      </div>

      {/* Experience Select */}
      <div className="space-y-1">
        <label htmlFor="experience-select" className="block font-medium">
          Experience
        </label>
        <select
          id="experience-select"
          className="w-full border rounded px-2 py-1"
          value={searchParams.get('experience') || 'Any'}
          onChange={(e) => handleChange('experience', e.target.value)}
        >
          <option>Any</option>
          <option>1-3 Years</option>
          <option>3-5 Years</option>
          <option>5+ Years</option>
        </select>
      </div>

      {/* Checkbox Filters */}
      <div className="space-y-2">
        <p className="font-medium">Other Filters</p>
        {checkboxOptions.map(({ label, key }) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`filter-${key}`}
              className="accent-blue-500"
              checked={searchParams.get(key) === 'true'}
              onChange={(e) => handleCheckbox(key, e.target.checked)}
            />
            <label htmlFor={`filter-${key}`} className="text-sm text-gray-700">
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
