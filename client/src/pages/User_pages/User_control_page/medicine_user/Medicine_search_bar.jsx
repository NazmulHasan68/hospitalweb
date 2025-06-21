import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { categories } from '@/components/Common/data';
import { useSearchByCategoryOrQueryQuery } from '@/redux/ApiController/medicineApi';

export default function MedicineSearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get('query') || '';
  const categoryParam = searchParams.get('categories');
  const initialCategories = categoryParam ? categoryParam.split(',') : [];

  const [query, setQuery] = useState(initialQuery);
  const [checkedCategories, setCheckedCategories] = useState(initialCategories);
  const [open, setOpen] = useState(false);

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

  // Send formatted categories to backend
  const { data: medicines = [], isLoading, isError } = useSearchByCategoryOrQueryQuery({
    query,
    categories: checkedCategories.map((c) =>
      c.toLowerCase().replace(/\s+/g, '_')
    ),
  });

  const handleCheckboxChange = (category) => {
    setCheckedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-5 mb-4">


      {/* Mobile Category Drawer */}
      <div className="md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              {open ? '✕' : '☰'}
            </Button>
          </DrawerTrigger>

          <DrawerContent side="left" className="p-4">
            <h2 className="text-lg font-bold text-blue-800 mb-4 border-b pb-2">Categories</h2>
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {categories.map((category, index) => {
                const isChecked = checkedCategories.includes(category);
                return (
                  <DrawerClose asChild key={index}>
                    <label
                      className={`flex items-center cursor-pointer text-sm px-3 py-2 rounded-md font-medium transition duration-200 ${
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
                  </DrawerClose>
                );
              })}
            </nav>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
