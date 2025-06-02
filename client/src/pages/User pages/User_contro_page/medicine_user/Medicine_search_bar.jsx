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

// Category list
const categories = [
  "Women's Choice", "Sexual Wellness", "Skin Care", "Diabetic Care", "Devices",
  "Supplement", "Diapers", "Baby Care", "Personal Care", "Hygiene & Freshness",
  "Dental Care", "Herbal Medicine", "Prescription Medicine", "OTC Medicine",
];

// Slugify helper
const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

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
      <div className='hidden lg:flex font-bold text-blue-600 text-md'>
        Chose your medicine
      </div>
      {/* Search Input */}
      <div className="bg-white shadow-md rounded-lg w-full flex items-center px-4 py-2 max-w-md mx-auto">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="search"
          placeholder="Search by medicine or company name "
          className="w-full text-gray-700 placeholder-gray-400 border-none focus:outline-none"
        />
      </div>

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
