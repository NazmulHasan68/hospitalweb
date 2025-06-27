import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, PlusCircle } from "lucide-react";
import { useCreateTravelHelpMutation } from "@/redux/ApiController/TravelApi";

export default function Travel_apply() {
  const [createTravelHelp] = useCreateTravelHelpMutation();

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    age: "",
    medicalCondition: "",
    preferredCountry: "",
    preferredCity: "",
    preferredHospital: "",
  });

  const [documentFields, setDocumentFields] = useState([[]]);
  const [loading, setLoading] = useState(false);

  // Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      documentFields.flat().forEach((file) => file?.preview && URL.revokeObjectURL(file.preview));
    };
  }, [documentFields]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files).map((file) => ({
      ...file,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
    }));

    const updatedFields = [...documentFields];
    updatedFields[index] = files;
    setDocumentFields(updatedFields);
  };

  const handleAddFileInput = () => {
    setDocumentFields((prev) => [...prev, []]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      documentFields.flat().forEach((file) => {
        payload.append("documents", file);
      });

      await createTravelHelp(payload).unwrap();

      toast.success("✅ আবেদন সফলভাবে সম্পন্ন হয়েছে!");

      setFormData({
        patientName: "",
        phone: "",
        email: "",
        age: "",
        medicalCondition: "",
        preferredCountry: "",
        preferredCity: "",
        preferredHospital: "",
      });
      setDocumentFields([[]]);
    } catch (err) {
      console.error(err);
      toast.error("❌ আবেদন জমা দিতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-28 bg-white rounded-xl p-8 my-12 border shadow">
      <h2 className="md:text-xl text-md font-bold mb-6 text-center text-gray-800">
        🛫 মেডিকেল ভ্রমণ সহায়তার জন্য আবেদন করুন
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>রোগীর নাম*</Label>
            <Input name="patientName" value={formData.patientName} onChange={handleChange} required />
          </div>
          <div>
            <Label>মোবাইল নম্বর</Label>
            <Input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div>
            <Label>ইমেইল</Label>
            <Input name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <Label>বয়স*</Label>
            <Input name="age" type="number" value={formData.age} onChange={handleChange} required />
          </div>
          <div>
            <Label>পছন্দের দেশ*</Label>
            <Input name="preferredCountry" value={formData.preferredCountry} onChange={handleChange} required />
          </div>
          <div>
            <Label>পছন্দের শহর</Label>
            <Input name="preferredCity" value={formData.preferredCity} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <Label>পছন্দের হাসপাতাল</Label>
            <Input name="preferredHospital" value={formData.preferredHospital} onChange={handleChange} />
          </div>
        </div>

        {/* Condition */}
        <div>
          <Label>চিকিৎসার বিবরণ*</Label>
          <Textarea
            name="medicalCondition"
            value={formData.medicalCondition}
            onChange={handleChange}
            required
            placeholder="রোগের বিস্তারিত লিখুন"
          />
        </div>

        {/* Files */}
        <div className="space-y-4">
          <Label className="text-sm">
            ডকুমেন্ট আপলোড করুন (Passport, NID বা জন্ম নিবন্ধন, প্রেসক্রিপশন)
          </Label>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {documentFields.map((files, index) => (
              <div key={index}>
                <Input type="file" multiple onChange={(e) => handleFileChange(e, index)} />

                {files.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {files.map((file, i) => (
                      <div key={i} className="text-sm w-40 md:w-60 text-center">
                        {file.preview ? (
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="w-full h-24 object-cover rounded border"
                          />
                        ) : (
                          <p className="text-blue-600">📄 {file.name}</p>
                        )}
                        <p className="text-xs mt-1 truncate">{file.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button type="button" variant="outline" onClick={handleAddFileInput} className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            নতুন ডকুমেন্ট যুক্ত করুন
          </Button>
        </div>

        {/* Submit */}
        <Button disabled={loading} type="submit" className="w-full mt-4">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              জমা দিচ্ছে...
            </span>
          ) : (
            "✅ আবেদন জমা দিন"
          )}
        </Button>
      </form>
    </div>
  );
}
