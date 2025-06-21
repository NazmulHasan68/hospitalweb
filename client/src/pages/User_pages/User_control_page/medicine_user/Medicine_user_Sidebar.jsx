import { categories } from '@/components/Common/data';
import { useSearchByCategoryOrQueryQuery } from '@/redux/ApiController/medicineApi';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function MedicineUserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Extract and normalize URL values back to readable format
  const initialQuery = searchParams.get('query') || '';
  const categoryParam = searchParams.get('categories');
  const initialCategories = categoryParam
    ? categoryParam.split(',').map((c) =>
        categories.find(
          (cat) => cat.toLowerCase().replace(/\s+/g, '_') === c
        )
      ).filter(Boolean)
    : [];

  const [query, setQuery] = useState(initialQuery);
  const [checkedCategories, setCheckedCategories] = useState(initialCategories);

  // Update URL when query or categories change
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (query.trim()) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    if (checkedCategories.length > 0) {
      const formatted = checkedCategories.map((c) =>
        c.toLowerCase().replace(/\s+/g, '_')
      );
      params.set('categories', formatted.join(','));
    } else {
      params.delete('categories');
    }

    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  }, [query, checkedCategories, location.pathname]);

  // Call backend with formatted categories
  const { data: medicines = [], isLoading, isError } = useSearchByCategoryOrQueryQuery({
    query,
    categories: checkedCategories.map((c) =>
      c.toLowerCase().replace(/\s+/g, '_')
    ),
  });

  console.log(medicines);
  

  const handleCheckboxChange = (category) => {
    setCheckedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
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
