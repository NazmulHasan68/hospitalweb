import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
import { toast } from 'sonner';
import { useAddConsultationMutation } from '@/redux/ApiController/consaltaionAPi';

const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const categories = [
  'Sexual problems',
  'Period problems / Gyne problems',
  'Fever, Cold / Flu, Allergy',
  'Child diseases',
  'Pregnancy issues',
  'Weight loss / gain, Diet chart',
  'Itching, Acne & Skin problems',
  'Hair fall and Dandruff',
  'Urine infection or problems',
  'Acidity, Indigestion, Diarrhea, Constipation',
  'Mental Health / Stress',
  'Allergy / Immunity Issues',
  'General check-up',
  'Eye issues',
  'Parasite / Infection',
  'Energy / Weakness',
];

export default function AddDoctorDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    specialization: '',
    phone: '',
    email: '',
    hospital: '',
    fees: '',
    recheckFees: '',
    age: '',
    experience: '',
    homeCheckup: '',
    homeCheckupFees: '',
    degree: '',
    category: '',
    checkupType: '',
    checkupStartTime: '',
    checkupEndTime: '',
    checkupDate: [],
    bio: '',
    isFree: false,
    isAvailableToday: false,
    experiences: [],
    photo: null,
    cv: null,
    govtLicense: [],
  });

  const [addConsultation, { isLoading }] = useAddConsultationMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'file') {
      if (name === 'govtLicense') {
        setForm((prev) => ({ ...prev, govtLicense: Array.from(e.target.files) }));
      } else {
        setForm((prev) => ({ ...prev, [name]: e.target.files[0] }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleWeekdayToggle = (day) => {
    setForm((prev) => ({
      ...prev,
      checkupDate: prev.checkupDate.includes(day)
        ? prev.checkupDate.filter((d) => d !== day)
        : [...prev.checkupDate, day],
    }));
  };

  const handleAddExperience = () => {
    setForm((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { hospitalName: '', position: '', startDate: '', endDate: '', yearsOfExperience: '' },
      ],
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...form.experiences];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, experiences: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === 'degree') {
        value.split(',').map((d) => d.trim()).forEach((deg) => formData.append('degree[]', deg));
      } else if (key === 'checkupDate') {
        value.forEach((day) => formData.append('checkupDate[]', day));
      } else if (key === 'experiences') {
        value.forEach((exp, i) => {
          Object.entries(exp).forEach(([f, v]) => {
            formData.append(`experiences[${i}][${f}]`, v);
          });
        });
      } else if (key === 'govtLicense') {
        value.forEach((file) => formData.append('govtLicense', file));
      } else if (key === 'photo' || key === 'cv') {
        if (value) formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      await addConsultation({newConsultation:formData}).unwrap();
      toast.success('Doctor added successfully!');
      setForm({
        name: '', specialization: '', phone: '', email: '', hospital: '',
        fees: '', recheckFees: '', age: '', experience: '', homeCheckup: '',
        homeCheckupFees: '', degree: '', category: '', checkupType: '',
        checkupStartTime: '', checkupEndTime: '', checkupDate: [], bio: '',
        isFree: false, isAvailableToday: false, experiences: [], photo: null,
        cv: null, govtLicense: [],
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to add doctor!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Doctor</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Doctor</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-4">
          {['name','specialization','phone','email','hospital','fees','recheckFees','age','experience','homeCheckup','homeCheckupFees','degree'].map((field) => (
            <div key={field}>
              <Label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</Label>
              <Input
                id={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                type={['fees','recheckFees','age','experience','homeCheckupFees'].includes(field) ? 'number' : 'text'}
              />
            </div>
          ))}

          <div>
            <Label>Category</Label>
            <Select value={form.category} onValueChange={(val) => setForm((prev) => ({ ...prev, category: val }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Checkup Type</Label>
            <Select value={form.checkupType} onValueChange={(val) => setForm((prev) => ({ ...prev, checkupType: val }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Checkup Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="in-person">In-person</SelectItem>
                <SelectItem value="both">Both</SelectItem>
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
            <Label>Available Days</Label>
            <div className="grid grid-cols-4 gap-2">
              {weekdays.map((day) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${day}`}
                    checked={form.checkupDate.includes(day)}
                    onCheckedChange={() => handleWeekdayToggle(day)}
                  />
                  <Label htmlFor={`day-${day}`}>{day.toUpperCase()}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <Label>Bio</Label>
            <Textarea name="bio" rows={3} value={form.bio} onChange={handleChange} />
          </div>

          <div className="flex gap-4 col-span-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="isFree" checked={form.isFree} onCheckedChange={(val) => setForm((prev) => ({ ...prev, isFree: Boolean(val) }))} />
              <Label htmlFor="isFree">Free Consultation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="isAvailableToday" checked={form.isAvailableToday} onCheckedChange={(val) => setForm((prev) => ({ ...prev, isAvailableToday: Boolean(val) }))} />
              <Label htmlFor="isAvailableToday">Available Today</Label>
            </div>
          </div>

          <div className="col-span-2">
            <Label>Work Experiences</Label>
            <Button type="button" variant="outline" onClick={handleAddExperience}>+ Add Experience</Button>
            {form.experiences.map((exp, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-2 mt-2 border p-2 rounded">
                <Input placeholder="Hospital Name" value={exp.hospitalName} onChange={(e) => handleExperienceChange(idx, 'hospitalName', e.target.value)} />
                <Input placeholder="Position" value={exp.position} onChange={(e) => handleExperienceChange(idx, 'position', e.target.value)} />
                <Input type="date" value={exp.startDate} onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)} />
                <Input type="date" value={exp.endDate} onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)} />
                <Input type="number" placeholder="Years of Experience" value={exp.yearsOfExperience} onChange={(e) => handleExperienceChange(idx, 'yearsOfExperience', e.target.value)} />
              </div>
            ))}
          </div>

          <div>
            <Label>Doctor Photo</Label>
            <Input type="file" name="photo" accept="image/*" onChange={handleChange} />
          </div>

          <div>
            <Label>CV (PDF)</Label>
            <Input type="file" name="cv" accept=".pdf" onChange={handleChange} />
          </div>

          <div>
            <Label>Government Licenses</Label>
            <Input type="file" name="govtLicense" accept=".pdf,.jpg,.png" multiple onChange={handleChange} />
          </div>

          <Button type="submit" disabled={isLoading} className="col-span-2">
            {isLoading ? 'Adding...' : 'Add Doctor'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}