"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  useDeleteStaffMutation,
  useGetOneStaffQuery,
  useUpdateStaffMutation,
} from "@/redux/ApiController/staffApi";
import { toast } from "sonner";
import { Edit } from "lucide-react";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  gender: "",
  religion: "",
  district: "",
  permanentAddress: "",
  presentAddress: "",
  familyNumber: "",
  dateOfBirth: "",
  department: "",
  position: "",
  salary: "",
  joiningDate: "",
  leavingDate: "",
  cv: null,
  photo: null,
};

export const EditEmployee = ({ staffId }) => {
  const [form, setForm] = useState(initialForm);
  const { data: staff, error, isLoading } = useGetOneStaffQuery(staffId);
  const [updateStaff] = useUpdateStaffMutation();
  const [deleteStaff] = useDeleteStaffMutation();

  useEffect(() => {
    if (staff) {
      setForm({
        ...staff,
        dateOfBirth: staff.dateOfBirth?.slice(0, 10),
        joiningDate: staff.joiningDate?.slice(0, 10),
        leavingDate: staff.leavingDate?.slice(0, 10),
        cv: null,
        photo: null,
      });
    }
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      await updateStaff({ id: staffId, formData }).unwrap();
      toast.success("✅ Staff updated successfully");
    } catch (err) {
      toast.error("❌ Failed to update staff");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this staff?")) {
      try {
        await deleteStaff(id).unwrap();
        toast.success("🗑️ Staff deleted successfully");
      } catch (error) {
        toast.error("❌ Error deleting staff");
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-slate-200 text-white rounded-full shadow hover:bg-slate-300">
          <Edit className="text-blue-600" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[90vw] sm:w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Edit Employee</SheetTitle>
          <SheetDescription className="text-sm text-gray-500">
            Update the employee information below.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <Input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
          <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />

          <div className="flex gap-3">
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-1/2 rounded border px-4 py-2"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              name="religion"
              value={form.religion}
              onChange={handleChange}
              className="w-1/2 rounded border px-4 py-2"
            >
              <option value="">Religion</option>
              <option value="Islam">Islam</option>
              <option value="Hindu">Hindu</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <Input name="district" placeholder="District" value={form.district} onChange={handleChange} />
          <Input name="permanentAddress" placeholder="Permanent Address" value={form.permanentAddress} onChange={handleChange} />
          <Input name="presentAddress" placeholder="Present Address" value={form.presentAddress} onChange={handleChange} />
          <Input name="familyNumber" placeholder="Family Contact Number" value={form.familyNumber} onChange={handleChange} />
          <Input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} className="text-gray-600" />

          <div className="flex gap-3">
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-1/2 rounded border px-4 py-2"
            >
              <option value="">Department</option>
              <option value="medicine">Medicine</option>
              <option value="travel">Travel</option>
              <option value="consultation">Consultation</option>
              <option value="homio">Homio</option>
              <option value="others">Others</option>
            </select>
            <select
              name="position"
              value={form.position}
              onChange={handleChange}
              required
              className="w-1/2 rounded border px-4 py-2"
            >
              <option value="">Position</option>
              <option value="manager">Manager</option>
              <option value="senior">Senior</option>
              <option value="junior">Junior</option>
              <option value="assistant">Assistant</option>
              <option value="intern">Intern</option>
              <option value="executive">Executive</option>
            </select>
          </div>

          <Input name="salary" placeholder="Salary (e.g. 20000)" value={form.salary} onChange={handleChange} />
          <div className="flex gap-2">
            <div>
              <Label>Joined</Label>
              <Input name="joiningDate" type="date" value={form.joiningDate} onChange={handleChange} />
            </div>
            <div>
              <Label>Leaving</Label>
              <Input name="leavingDate" type="date" value={form.leavingDate} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Upload Photo</label>
            <input type="file" name="photo" accept="image/*" onChange={handleFileChange} className="w-full rounded border p-2" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Upload CV (PDF)</label>
            <input type="file" name="cv" accept=".pdf" onChange={handleFileChange} className="w-full rounded border p-2" />
          </div>

          <SheetFooter className="pt-4 flex justify-between">
            <SheetClose asChild>
              <Button variant="outline" type="button" onClick={() => handleDelete(staffId)}>
                Delete
              </Button>
            </SheetClose>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Save
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
