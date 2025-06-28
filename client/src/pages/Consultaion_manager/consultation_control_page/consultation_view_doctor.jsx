import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import {
  useGetConsultationByIdQuery,
  useUpdateConsultationMutation,
} from '@/redux/ApiController/consaltaionAPi';

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

export default function ConsultationViewDoctor() {
  const { id } = useParams();
  const { data: doctor, isLoading } = useGetConsultationByIdQuery(id);
  const [updateConsultation, { isLoading: isUpdating }] = useUpdateConsultationMutation();

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
    homeCheckupfess: '',
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
    popular : false,
    suggested : false,
  });

  // Store URLs of uploaded files (image, cv, licenses) for preview
  const [photoUrl, setPhotoUrl] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [govtLicenseUrls, setGovtLicenseUrls] = useState([]);

  useEffect(() => {
    if (doctor) {
      setForm({
        name: doctor.name || '',
        specialization: doctor.specialization || '',
        phone: doctor.phone || '',
        email: doctor.email || '',
        hospital: doctor.hospital || '',
        fees: doctor.fees || '',
        recheckFees: doctor.recheckFees || '',
        age: doctor.age || '',
        experience: doctor.experience || '',
        homeCheckup: doctor.homeCheckup || '',
        homeCheckupfess: doctor.homeCheckupfess || '',
        degree: (doctor.degree || []).join(', '),
        category: doctor.category || '',
        checkupType: doctor.checkupType || '',
        checkupStartTime: doctor.checkupStartTime || '',
        checkupEndTime: doctor.checkupEndTime || '',
        checkupDate: doctor.checkupDate || [],
        bio: doctor.bio || '',
        isFree: doctor.isFree || false,
        isAvailableToday: doctor.isAvailableToday || false,
        experiences: doctor.experiences || [],
        photo:  doctor.photo || [],
        cv:  doctor.cv || [],
        govtLicense: doctor.govtLicense || [],
        suggested : doctor.suggested || false,
        popular : doctor.popular || false,
      });

      // Assuming your backend sends URLs for the stored files, update the previews
      setPhotoUrl(doctor.photoUrl || '');
      setCvUrl(doctor.cvUrl || '');
      setGovtLicenseUrls(doctor.govtLicenseUrls || []);
    }
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      if (name === 'govtLicense') {
        setForm((prev) => ({ ...prev, govtLicense: Array.from(files) }));
      } else {
        setForm((prev) => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
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
        value
          .split(',')
          .map((d) => d.trim())
          .forEach((deg) => formData.append('degree[]', deg));
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
      await updateConsultation({ id, updatedData: formData }).unwrap();
      toast.success('Doctor updated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update doctor!');
    }
  };

  if (isLoading) return <div>Loading doctor data...</div>;
  console.log(form);
  
  return (
    <div className="max-w-4xl mx-auto p-4 h-[500px] overflow-auto">
      <h1 className="text-2xl font-bold mb-4">Dr. {form.name} </h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
        {/* Name, specialization, etc */}
        {[
          'name',
          'specialization',
          'phone',
          'email',
          'hospital',
          'fees',
          'recheckFees',
          'age',
          'experience',
          'homeCheckup',
          'homeCheckupfess',
          'degree',
        ].map((field) => (
          <div key={field}>
            <Label htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</Label>
            <Input
              id={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              type={
                ['fees', 'recheckFees', 'age', 'experience', 'homeCheckupfess'].includes(field)
                  ? 'number'
                  : 'text'
              }
            />
          </div>
        ))}

        {/* Category */}
        <div>
          <Label>Category</Label>
          <Select
            value={form.category}
            onValueChange={(val) => setForm((prev) => ({ ...prev, category: val }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Checkup Type */}
        <div>
          <Label>Checkup Type</Label>
          <Select
            value={form.checkupType}
            onValueChange={(val) => setForm((prev) => ({ ...prev, checkupType: val }))}
          >
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

        {/* Time inputs */}
        <div>
          <Label>Start Time</Label>
          <Input
            type="time"
            name="checkupStartTime"
            value={form.checkupStartTime}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>End Time</Label>
          <Input
            type="time"
            name="checkupEndTime"
            value={form.checkupEndTime}
            onChange={handleChange}
          />
        </div>

        {/* Available days */}
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

        {/* Bio */}
        <div className="col-span-2">
          <Label>Bio</Label>
          <Textarea name="bio" rows={3} value={form.bio} onChange={handleChange} />
        </div>

        {/* Checkboxes */}
        <div className="flex gap-4 col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isFree"
              checked={form.isFree}
              onCheckedChange={(val) => setForm((prev) => ({ ...prev, isFree: Boolean(val) }))}
            />
            <Label htmlFor="isFree">Free Consultation</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAvailableToday"
              checked={form.isAvailableToday}
              onCheckedChange={(val) =>
                setForm((prev) => ({ ...prev, isAvailableToday: Boolean(val) }))
              }
            />
            <Label htmlFor="isAvailableToday">Available Today</Label>
          </div>

           <div className="flex items-center space-x-2">
            <Checkbox
              id="suggested"
              checked={form.suggested}
              onCheckedChange={(val) =>
                setForm((prev) => ({ ...prev, suggested: Boolean(val) }))
              }
            />
            <Label htmlFor="suggested">Suggested </Label>
          </div>


           <div className="flex items-center space-x-2">
            <Checkbox
              id="popular"
              checked={form.popular}
              onCheckedChange={(val) =>
                setForm((prev) => ({ ...prev, popular: Boolean(val) }))
              }
            />
            <Label htmlFor="popular">Popular</Label>
          </div>

        </div>

        {/* Experiences */}
        <div className="col-span-2">
          <Label>Work Experiences</Label>
          <Button type="button" variant="outline" onClick={handleAddExperience}>
            + Add Experience
          </Button>
          {form.experiences.map((exp, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-2 mt-2 border p-2 rounded">
              <Input
                placeholder="Hospital Name"
                value={exp.hospitalName}
                onChange={(e) => handleExperienceChange(idx, 'hospitalName', e.target.value)}
              />
              <Input
                placeholder="Position"
                value={exp.position}
                onChange={(e) => handleExperienceChange(idx, 'position', e.target.value)}
              />
              <Input
                type="date"
                value={exp.startDate ? exp.startDate.slice(0, 10) : ''} 
                onChange={(e) => handleExperienceChange(idx, 'startDate', e.target.value)}
              />

              <Input
                type="date"
                value={exp.endDate ? exp.endDate.slice(0, 10) : ''}
                onChange={(e) => handleExperienceChange(idx, 'endDate', e.target.value)}
              />
              <Input
                type="number"
                placeholder="Years of Experience"
                value={exp.yearsOfExperience}
                onChange={(e) => handleExperienceChange(idx, 'yearsOfExperience', e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Photo preview & file input */}
        <div className="col-span-2">
          <Label>Doctor Photo</Label>
          {form.photo ? (
            <img src={`${import.meta.env.VITE_BASE_URL}/public/doctor/${form.photo}`} alt="Doctor" className="w-32 h-36 object-cover rounded mb-2" />
          ) : (
            <p>No photo uploaded</p>
          )}
          <Input type="file" name="photo" accept="image/*" onChange={handleChange} />
        </div>

        {/* CV preview & file input */}
        <div className="col-span-2">
          <Label>CV (PDF)</Label>
          {form.cv ? (
            <a href={`${import.meta.env.VITE_BASE_URL}/public/doctor/${form.cv}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block mb-2">
              View Uploaded CV
            </a>
          ) : (
            <p>No CV uploaded</p>
          )}
          <Input type="file" name="cv" accept=".pdf" onChange={handleChange} />
        </div>

        {/* Govt License preview & file input */}
        <div className="col-span-2">
          <Label>Government Licenses</Label>
          {form.govtLicense.length ? (
            <ul className="list-disc ml-5 mb-2">
              {form.govtLicense.map((url, idx) => (
                <li key={idx}>
                  <a href={`${import.meta.env.VITE_BASE_URL}/public/doctor/${url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    License Document {idx + 1}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No licenses uploaded</p>
          )}
          <Input type="file" name="govtLicense" accept=".pdf,.jpg,.png" multiple onChange={handleChange} />
        </div>

        <Button type="submit" disabled={isUpdating} className="col-span-2">
          {isUpdating ? 'Updating...' : 'Update Doctor'}
        </Button>
      </form>
    </div>
  );
}
