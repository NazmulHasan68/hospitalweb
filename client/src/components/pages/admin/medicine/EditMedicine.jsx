import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  useGetMedicineByIdQuery,
  useUpdateMedicineMutation,
} from "@/redux/ApiController/medicineApi";
import { toast } from "sonner";
import { categories } from "@/components/Common/data";
import { SquarePen } from "lucide-react";

export const EditMedicine = ({ id }) => {
  const { data, isLoading: loadingMedicine } = useGetMedicineByIdQuery(id);
  const [updateMedicine, { isLoading: updating }] = useUpdateMedicineMutation();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    description: "",
    images: [],
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
  });

  useEffect(() => {
    if (data) {
      setFormData({
        ...data,
        images: data.images || [],
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const updated = [...formData.images];
    updated[index] = file;
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleCheckbox = (checked) => {
    setFormData((prev) => ({ ...prev, prescriptionRequired: checked }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, null] }));
  };

  const categoryOptions = categories.map((label) => ({
    label,
    value: label.toLowerCase().replace(/\s+/g, "_"),
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((fileOrUrl) => {
          if (fileOrUrl instanceof File) {
            form.append("images", fileOrUrl);
          }
        });
      } else {
        form.append(key, value);
      }
    });

    try {
      await updateMedicine({ id, formData: form }).unwrap();
      toast.success("Medicine updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update medicine.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setOpen(true)}>
          <SquarePen className="" />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Medicine</DialogTitle>
          <DialogDescription>Update the details of this medicine</DialogDescription>
        </DialogHeader>

        {loadingMedicine ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input name="brand" value={formData.brand} onChange={handleChange} />
              </div>

              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea name="description" value={formData.description} onChange={handleChange} />
              </div>

              {formData.images.map((img, index) => (
                <div key={index} className="col-span-2">
                  <Label>Image #{index + 1} </Label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <div className="mt-2">
                    {typeof img === "string" && (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/public${img}`}
                        alt={`Image ${index + 1}`}
                        className="w-32 h-32 object-cover rounded"
                      />
                    )}
                    {img instanceof File && (
                      <img
                        src={`${import.meta.env.VITE_BASE_URL}/${URL.createObjectURL(img)}`}
                        alt={`Preview ${index + 1}`}
                        className="w-32 h-32 object-cover rounded"
                        onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                      />
                    )}
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addImageField}
                className="col-span-2 w-fit text-sm"
              >
                + Add Another Image
              </Button>

              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Input name="country" value={formData.country} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="company">Company</Label>
                <Input name="company" value={formData.company} onChange={handleChange} />
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="discount">Discount</Label>
                <Input
                  type="number"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="productionDate">Production Date</Label>
                <Input
                  type="date"
                  name="productionDate"
                  value={formData.productionDate?.slice(0, 10)}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate?.slice(0, 10)}
                  onChange={handleChange}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="warning">Warning</Label>
                <Textarea name="warning" value={formData.warning} onChange={handleChange} />
              </div>

              <div className="flex items-center gap-2 col-span-2">
                <Checkbox
                  checked={formData.prescriptionRequired}
                  onCheckedChange={handleCheckbox}
                />
                <Label>Prescription Required</Label>
              </div>
            </div>

            <DialogFooter className="mt-4">
              <Button type="submit" disabled={updating}>
                {updating ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
