import React, { useState , useEffect} from "react";
import { useDeleteMedicineMutation, useGetAllMedicinesQuery ,useGetMedicineByIdQuery } from "@/redux/ApiController/medicineApi";
import { Beer, SquareChartGantt, SquarePen } from "lucide-react";
import { AddMedicine } from "@/components/pages/admin/medicine/Addmedicine";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { EditMedicine } from "@/components/pages/admin/medicine/EditMedicine";
import { Label } from "@radix-ui/react-dropdown-menu";
import { categories } from "@/components/Common/data";

const ITEMS_PER_PAGE = 12;

export default function ProductList() {
  const { data } = useGetAllMedicinesQuery();
  const [deleteMedicine] = useDeleteMedicineMutation();

  const sampleMedicines = data;

  // Filter States
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);

  // Apply filters
  const filteredMedicines = sampleMedicines?.filter((med) => {
    const matchesCategory = categoryFilter
      ? med.category?.toLowerCase() === categoryFilter.toLowerCase()
      : true;

    const matchesSearch = searchTerm
      ? med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.company?.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredMedicines?.length / ITEMS_PER_PAGE);

  const currentMedicines = filteredMedicines?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleProductDelete = async (id) => {
    try {
      await deleteMedicine(id).unwrap();
      toast.success("Medicine deleted successfully!");
    } catch (error) {
      console.error("Failed to delete medicine:", error);
      toast.error("Failed to delete medicine.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-blue-600">
          Total Products: {filteredMedicines?.length || 0}
        </h2>
        <AddMedicine />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-sm">
        {/* Category Filter */}
       <div className="w-full">
        <Label
          htmlFor="category"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Category
        </Label>
        <Select
          value={categoryFilter}
          onValueChange={(value) => {
            const formattedValue = value.toLowerCase().replace(/\s+/g, "_");
            setCategoryFilter(formattedValue);
            setCurrentPage(1);
   
          }}
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories?.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        </div>


        {/* Search Input */}
        <div className="col-span-2 md:col-span-3">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            placeholder="Search by product name, Country, Company"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentMedicines?.map((med) => (
          <div
            key={med._id}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition flex gap-4"
          >
            <img
              src={`${import.meta.env.VITE_BASE_URL}/public/${
                med.images?.[0] || "default-image.png"
              }`}
              alt={med.name}
              className="w-14 h-14 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium text-sm line-clamp-1">{med.name}</h3>
              <p className="text-xs text-gray-500 mt-2">
                Country : <span className="font-semibold">{med.country}</span>
              </p>
              <p className="text-xs text-gray-500">
                Company : <span className="font-semibold">{med.company}</span>
              </p>
              <p className="text-xs text-gray-500">
                Price : <span className="font-semibold">{med.price}</span>
              </p>
            </div>
            <div className="space-x-2 text-xs flex flex-col gap-1 items-end">
              {/* Assuming ViewMedicine and EditMedicine are dialog or button components */}
              {/* Replace with actual functionality as needed */}
              <button className="text-yellow-600 hover:underline">
                <EditMedicine id={med._id} />
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleProductDelete(med._id)}
              >
                <Beer />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages || 1)]?.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-1.5 rounded border text-sm font-medium ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}









// ----------------------------------------
// ✅ AddMedicine Dialog Component
// ----------------------------------------

 const ViewMedicine = ({ id }) => {
  const { data: med, isLoading, error } = useGetMedicineByIdQuery(id);
  console.log(med);
  
  const [mainImage, setMainImage] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (med?.images?.length) {
      setMainImage(med.images[0]);
    }
  }, [med]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)}><SquareChartGantt /></div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl space-y-4">
        {isLoading ? (
          <div className="py-10 text-center">Loading...</div>
        ) : error || !med ? (
          <div className="text-red-500">Failed to load medicine details.</div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{med.name}</DialogTitle>
              <DialogDescription>Details for {med.brand}</DialogDescription>
            </DialogHeader>

            {/* Main Image */}
            <div className="flex flex-col gap-2">
              {mainImage && (
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/public/${mainImage}`}
                  alt="Main"
                  className="w-full h-32 md:h-40 object-cover rounded border"
                />
              )}

              {/* Thumbnails */}
              <div className="flex gap-2 flex-row ">
                {med.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className={`md:w-14 w-10 h-10 md:h-14 border rounded ${
                      img === mainImage ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={`${import.meta.env.VITE_BASE_URL}/public/${img}`}
                      alt={`thumb-${index}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
            </div>

            </div>    

            {/* Info Grid */}
            <div className="grid md:grid-cols-3 grid-cols-2 gap-1 text-sm">
              <div><strong>Price:</strong> ৳{med.price}</div>
              <div><strong>Brand:</strong> {med.brand}</div>
              <div><strong>Country:</strong> {med.country}</div>
              <div><strong>Category:</strong> {med.category.replace(/_/g, " ")}</div>
              <div><strong>Discount:</strong> {med.discount}%</div>
              <div><strong>Stock:</strong> {med.stock}</div>
              <div>
                <strong>Production Date:</strong>{" "}
                {new Date(med.productionDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Expiry Date:</strong>{" "}
                {new Date(med.expiryDate).toLocaleDateString()}
              </div>
              <div className="col-span-2">
                <strong>Prescription Required:</strong>{" "}
                {med.prescriptionRequired ? "Yes" : "No"}
              </div>
              <div className="col-span-2 line-clamp-4"><strong>Warning:</strong> {med.warning}</div>
              <div className="col-span-2 line-clamp-5"><strong>Description:</strong> {med.description}</div>
            </div>

            <DialogFooter>
              <Button type="button" onClick={() => setOpen(false)} className="bg-red-600 hover:bg-red-700">
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}