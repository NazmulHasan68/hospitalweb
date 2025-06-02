import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const categories = [
  "Women's Choice", "Sexual Wellness", "Skin Care", "Diabetic Care", "Devices",
  "Supplement", "Diapers", "Baby Care", "Personal Care", "Hygiene & Freshness",
  "Dental Care", "Herbal Medicine", "Prescription Medicine", "OTC Medicine",
];

export default function MedicineUserSidebar({ onFilterChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [checkedCategories, setCheckedCategories] = useState([]);

  // Sync from URL when location.search changes (e.g., on refresh or back/forward)
  useEffect(() => {
    const paramCategories = searchParams.get('categories');
    const parsed = paramCategories ? paramCategories.split(',') : [];
    setCheckedCategories(parsed);
    onFilterChange?.(parsed); 
  }, [location.search]);

  // Update URL when checkedCategories changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (checkedCategories.length > 0) {
      params.set('categories', checkedCategories.join(','));
    } else {
      params.delete('categories');
    }

    navigate(
      { pathname: location.pathname, search: params.toString() },
      { replace: true }
    );
  }, [checkedCategories]);

  const handleCheckboxChange = (category) => {
    setCheckedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <aside className="hidden md:block md:w-64 bg-white shadow-lg rounded-xl p-4">
      <h2 className="text-lg md:text-xl font-bold text-blue-800 mb-4 border-b pb-2">
        Categories
      </h2>
      <nav className="grid grid-cols-2 h-[560px] overflow-auto sm:grid-cols-3 md:grid-cols-1 gap-2">
        {categories.map((category) => {
          const isChecked = checkedCategories.includes(category);
          return (
            <label
              key={category}
              className={`flex items-center cursor-pointer text-sm md:text-base px-3 py-2 rounded-md font-medium transition duration-200 ${
                isChecked
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:text-white hover:bg-blue-600'
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleCheckboxChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          );
        })}
      </nav>
    </aside>
  );
}
