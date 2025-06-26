import React, { useState, useEffect } from 'react';
import { useCreateHospitalMutation } from '@/redux/ApiController/Hospital';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function AddHospital() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    hospitalName: '',
    country: '',
    city: '',
    address: '',
    established: '',
    beds: '',
    speciality: '',
    description: '',
    map: '',
    type: '', 
  });

  const [bannerFile, setBannerFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [createHospital, { isLoading }] = useCreateHospitalMutation();
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form fields and bannerFile to enable submit button
  useEffect(() => {
    const {
      hospitalName,
      country,
      city,
      address,
      established,
      beds,
      speciality,
      description,
      type,
    } = form;

    const isValid =
      hospitalName.trim() !== '' &&
      country.trim() !== '' &&
      city.trim() !== '' &&
      address.trim() !== '' &&
      established.trim() !== '' &&
      beds.toString().trim() !== '' &&
      speciality.trim() !== '' &&
      description.trim() !== '' &&
      type.trim() !== '' &&
      bannerFile !== null;

    setIsFormValid(isValid);
  }, [form, bannerFile]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setBannerFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error('Please complete all required fields and upload a banner image.');
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('banner', bannerFile);

      await createHospital(formData).unwrap();
      toast.success('✅ Hospital created successfully');
      setOpen(false);
      // Reset form
      setForm({
        hospitalName: '',
        country: '',
        city: '',
        address: '',
        established: '',
        beds: '',
        speciality: '',
        description: '',
        map: '',
        type: '',
      });
      setBannerFile(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to create hospital');
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn btn-outline btn-primary">
        Add Hospital
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-900 bg-opacity-70 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white text-gray-700 rounded-lg shadow-lg max-w-3xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-xl text-gray-600 hover:text-red-500"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">🏥 Add New Hospital</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  name="hospitalName"
                  placeholder="Hospital Name"
                  onChange={handleChange}
                  value={form.hospitalName}
                  required
                />
              <div className='w-full'>
                <select
                  name="country"
                  onChange={handleChange}
                  value={form.country}
                  required
                  className="w-full py-2 border border-gray-400 px-4"
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  <option value="india">India</option>
                  <option value="thailand">Thailand</option>
                  <option value="uae">UAE</option>
                  <option value="germany">Germany</option>
                  <option value="chin">Chin</option>
                  <option value="singapore">Singapore</option>
                  <option value="egypt">Egypt</option>
                </select>
              </div>

                <Input name="city" placeholder="City" onChange={handleChange} value={form.city} required />
                <Input
                  name="address"
                  placeholder="Full Address"
                  onChange={handleChange}
                  value={form.address}
                  required
                />
                <Input
                  name="established"
                  placeholder="Established Year"
                  onChange={handleChange}
                  value={form.established}
                  required
                />
                <Input
                  name="beds"
                  type="number"
                  placeholder="Number of Beds"
                  onChange={handleChange}
                  value={form.beds}
                  required
                />
                <Input
                  name="speciality"
                  placeholder="Speciality (e.g. Cardiology)"
                  onChange={handleChange}
                  value={form.speciality}
                  required
                />
                <Input name="map" placeholder="Google Maps Link" onChange={handleChange} value={form.map} />
              </div>

              <div className='flex gap-6 justify-between items-center'>
                <div className="-mt-2 basis-1/2">
                    <Input type="file" accept="image/*" onChange={handleBannerChange} required />
                    {previewUrl && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        <img src={previewUrl} className="w-full h-24 object-cover rounded border" alt="Banner Preview" />
                      </div>
                    )}
                </div>
                <div className='w-full  basis-1/2'>
                  <select
                    name="type"
                    onChange={handleChange}
                    value={form.type}
                    required
                    className="w-full py-2 border border-gray-400"
                  >
                    <option value="" disabled>
                      Select Hospital Type
                    </option>
                    <option value="private">Private</option>
                    <option value="government">Government</option>
                  </select>
                </div>
              </div>

              <Textarea
                name="description"
                placeholder="Hospital Description"
                onChange={handleChange}
                value={form.description}
                rows={4}
                required
              />
              <Button
                type="submit"
                disabled={isLoading || !isFormValid}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {isLoading ? 'Creating...' : 'Create Hospital'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
