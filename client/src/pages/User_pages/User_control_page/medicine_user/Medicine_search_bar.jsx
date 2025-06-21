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


export default function MedicineSearchBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState(false);

  // Initialize checked categories from URL
  const initialCategories = searchParams.get('categories');
  const [checkedCategories, setCheckedCategories] = useState(
    initialCategories ? initialCategories.split(',') : []
  );

  // Update URL query string when categories change
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
  }, [checkedCategories, location.pathname, location.search, navigate]);

  // Toggle checkbox state
  const handleCheckboxChange = (category) => {
    setCheckedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setOpen(false); 
  };

  return (
    <div className='flex justify-between items-center gap-2'>
    

      {/* Drawer for Mobile Category Filter */}
      <div className="md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="default">
              {open ? '✕' : '☰'}
            </Button>
          </DrawerTrigger>

          <DrawerContent side="left" className="p-4">
            <h2 className="text-lg font-bold text-blue-800 mb-4 border-b pb-2">
              Categories
            </h2>
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
