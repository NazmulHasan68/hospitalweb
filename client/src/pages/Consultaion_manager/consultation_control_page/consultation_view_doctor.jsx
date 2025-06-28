import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetConsultationByIdQuery, useUpdateConsultationMutation } from '@/redux/ApiController/consaltaionAPi';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

export default function ConsultationViewDoctor() {
  const { id } = useParams();
  const { data: doctor, isLoading } = useGetConsultationByIdQuery(id);
  const [updateConsultation] = useUpdateConsultationMutation();

  const [form, setForm] = useState(null);

  React.useEffect(() => {
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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Doctor Information</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <Label>Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <Label>Specialization</Label>
          <Input name="specialization" value={form.specialization} onChange={handleChange} />
        </div>
        <div>
          <Label>Phone</Label>
          <Input name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div>
          <Label>Email</Label>
          <Input name="email" value={form.email} onChange={handleChange} />
        </div>
        <div>
          <Label>Hospital</Label>
          <Input name="hospital" value={form.hospital} onChange={handleChange} />
        </div>
        <div>
          <Label>Fees</Label>
          <Input type="number" name="fees" value={form.fees} onChange={handleChange} />
        </div>
        <div>
          <Label>Re-check Fees</Label>
          <Input type="number" name="recheckFees" value={form.recheckFees} onChange={handleChange} />
        </div>
        <div>
          <Label>Checkup Type</Label>
          <Select value={form.checkupType} onValueChange={(value) => handleSelectChange('checkupType', value)}>
            <SelectTrigger><SelectValue placeholder="Checkup Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="in-person">In-Person</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Start Time</Label>
          <Input type="time" name="checkupStartTime" value={form.checkupStartTime} onChange={handleChange} />
        </div>
        <div>
          <Label>End Time</Label>
          <Input type="time" name="checkupEndTime" value={form.checkupEndTime} onChange={handleChange} />
        </div>
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
