import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetConsultationByIdQuery,
  useUpdateConsultationMutation,
} from '@/redux/ApiController/consaltaionAPi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

export default function ConsultationViewDoctor() {
  const { id } = useParams();
  const { data: doctor, isLoading } = useGetConsultationByIdQuery(id);
  const [updateConsultation] = useUpdateConsultationMutation();

  const [form, setForm] = useState(null);

  useEffect(() => {
    if (doctor) setForm({ ...doctor });
  }, [doctor]);

  if (isLoading || !form) return <p className="text-center">Loading...</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateConsultation({ id, updatedData: form }).unwrap();
      alert('Doctor updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Update failed!');
    }
  };

  const allCategories = [
    'general','pediatrician','gynecologist','cardiologist','dermatologist','dentist','orthopedic','psychiatrist','neurologist','ent','urologist','ophthalmologist','gastroenterologist','endocrinologist','oncologist','nephrologist','pulmonologist','hematologist','rheumatologist','anesthesiologist','radiologist']

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Doctor Information</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <Input label="Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Specialization" name="specialization" value={form.specialization} onChange={handleChange} />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} />
        <Input label="Hospital" name="hospital" value={form.hospital} onChange={handleChange} />
        <Input label="Fees" type="number" name="fees" value={form.fees} onChange={handleChange} />
        <Input label="Recheck Fees" type="number" name="recheckFees" value={form.recheckFees} onChange={handleChange} />
        <Input label="Age" type="number" name="age" value={form.age} onChange={handleChange} />
        <Input label="Experience (years)" type="number" name="experience" value={form.experience} onChange={handleChange} />
        <Input label="Home Checkup Area" name="homeCheckup" value={form.homeCheckup} onChange={handleChange} />
        <Input label="Home Checkup Fees" type="number" name="homeCheckupfess" value={form.homeCheckupfess} onChange={handleChange} />
        <Input label="Degree (comma separated)" name="degree" value={Array.isArray(form.degree) ? form.degree.join(', ') : form.degree} onChange={handleChange} />

        <div>
          <Label>Category</Label>
          <Select value={form.category} onValueChange={(val) => handleSelectChange('category', val)}>
            <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
            <SelectContent>
              {allCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Checkup Type</Label>
          <Select value={form.checkupType} onValueChange={(val) => handleSelectChange('checkupType', val)}>
            <SelectTrigger><SelectValue placeholder="Select Checkup Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="in-person">In-person</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input label="Start Time" type="time" name="checkupStartTime" value={form.checkupStartTime} onChange={handleChange} />
        <Input label="End Time" type="time" name="checkupEndTime" value={form.checkupEndTime} onChange={handleChange} />

        <div className="col-span-2">
          <Label>Bio</Label>
          <Textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />
        </div>

        <div className="flex gap-4 col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="isFree" checked={form.isFree} onCheckedChange={(val) => handleSelectChange('isFree', val)} />
            <Label htmlFor="isFree">Free Consultation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="isAvailableToday" checked={form.isAvailableToday} onCheckedChange={(val) => handleSelectChange('isAvailableToday', val)} />
            <Label htmlFor="isAvailableToday">Available Today</Label>
          </div>
        </div>

        <Button type="submit" className="col-span-2">Update Doctor</Button>
      </form>
    </div>
  );
}
