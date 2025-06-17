import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCreateMedicineMutation } from "@/redux/ApiController/medicineApi";
import { toast } from "sonner";

const sampleMedicines = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Medicine ${i + 1}`,
  price: `$${(5 + i * 0.75).toFixed(2)}`,
  image: "https://via.placeholder.com/40",
}));

const ITEMS_PER_PAGE = 12;

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sampleMedicines.length / ITEMS_PER_PAGE);

  const currentMedicines = sampleMedicines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-blue-600">
          Total Products: {sampleMedicines.length}
        </h2>
        <AddMedicine />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-sm">
        <Input placeholder="Category" />
        <Input placeholder="Company" />
        <Input placeholder="Country" />
        <Input
          className="col-span-2 md:col-span-1"
          placeholder="Search by product name"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentMedicines.map((med) => (
          <div
            key={med.id}
            className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center gap-4"
          >
            <img
              src={med.image}
              alt={med.name}
              className="w-14 h-14 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium text-lg">{med.name}</h3>
              <p className="text-sm text-gray-500">{med.price}</p>
            </div>
            <div className="space-x-2 text-sm">
              <button className="text-blue-600 hover:underline">View</button>
              <button className="text-yellow-600 hover:underline">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {[...Array(totalPages)].map((_, i) => (
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

const AddMedicine = () => {
  const initialFormData = {
    name: "",
    brand: "",
    description: "",
    images: [null], // start with one empty slot
    category: "",
    country: "",
    company: "",
    price: "",
    discount: "",
    stock: "",
    productionDate: "",
    expiryDate: "",
    warning: "",
    prescriptionRequired: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [createMedicine, { isLoading }] = useCreateMedicineMutation();
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newImages = [...formData.images];
    newImages[index] = file;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleCheckbox = (checked) => {
    setFormData((prev) => ({ ...prev, prescriptionRequired: checked }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, null] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file) => {
          if (file instanceof File) {
            form.append("images", file);
          }
        });
      } else {
        form.append(key, value);
      }
    });

    try {
      await createMedicine(form).unwrap();
      toast.success("Medicine added successfully!");
      setFormData(initialFormData); // reset form
      setOpen(false); // close dialog
    } catch (error) {
      console.error("Error submitting medicine:", error);
      toast.error("Failed to add medicine.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add Medicine</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Medicine</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill out the details of your product
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {formData.images.map((imgFile, index) => (
              <div key={index} className="col-span-2 flex flex-col gap-1">
                <Label>Image #{index + 1}</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />
                {imgFile && (
                  <img
                    src={URL.createObjectURL(imgFile)}
                    alt={`Preview ${index + 1}`}
                    className="w-32 h-32 object-contain mt-2 rounded border"
                    onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                  />
                )}
              </div>
            ))}

            <Button
              type="button"
              onClick={addImageField}
              className="w-fit text-sm col-span-2"
              variant="outline"
            >
              + Add Another Image
            </Button>

            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                required
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                name="discount"
                type="number"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                required
                value={formData.stock}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="productionDate">Production Date</Label>
              <Input
                id="productionDate"
                name="productionDate"
                type="date"
                value={formData.productionDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-2">
              <Label htmlFor="warning">Warning</Label>
              <Textarea
                id="warning"
                name="warning"
                value={formData.warning}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center gap-2 col-span-2">
              <Checkbox
                id="prescriptionRequired"
                checked={formData.prescriptionRequired}
                onCheckedChange={handleCheckbox}
              />
              <Label htmlFor="prescriptionRequired">Prescription Required</Label>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
