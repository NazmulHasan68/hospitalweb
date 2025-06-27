import React, { useState, useMemo } from "react";
import { useGetAllTravelHelpsQuery, useUpdateTravelHelpMutation } from "@/redux/ApiController/TravelApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Travel_complete_processing() {
  const { data = [], isLoading, isError } = useGetAllTravelHelpsQuery();
  const [updateTravel] = useUpdateTravelHelpMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

const filtered = useMemo(() => {
  return data
    ?.filter((item) =>
      [
        item.patientName,
        item.phone,
        item.email,
        item.preferredCountry,
        item.medicalCondition,
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((item) => item.status === "approved");
}, [searchTerm, data]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateTravel({ id, data: { status } }).unwrap();
      toast.success(`✅ স্ট্যাটাস "${status}" এ আপডেট হয়েছে`);
    } catch (err) {
      toast.error("❌ স্ট্যাটাস পরিবর্তন ব্যর্থ হয়েছে");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2">লোড হচ্ছে...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        ❌ ডেটা লোড করতে সমস্যা হয়েছে।
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-6 pb-4 px-4">
      <h2 className="text-xl font-bold text-center mb-6">
        📝 মেডিকেল ট্রাভেল অ্যাপয়েন্টমেন্ট তালিকা
      </h2>

      <Card className="p-4 mb-6 shadow-sm border">
        <Input
          className="w-full md:w-1/2 mx-auto"
          placeholder="🔍 নাম, ফোন, দেশ, ইমেইল অথবা কন্ডিশন দিয়ে খুঁজুন"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      <div className="overflow-x-auto border rounded-md shadow-sm">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">নাম</th>
              <th className="px-4 py-2 text-left">ফোন</th>
              <th className="px-4 py-2 text-left">দেশ</th>
              <th className="px-4 py-2 text-left">স্ট্যাটাস</th>
              <th className="px-4 py-2 text-center">ডিটেইলস</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  কোনো অ্যাপয়েন্টমেন্ট পাওয়া যায়নি
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{item.patientName}</td>
                  <td className="px-4 py-2">{item.phone}</td>
                  <td className="px-4 py-2">{item.preferredCountry}</td>
                  <td className="px-4 py-2">
                    <Select
                      value={item.status}
                      onValueChange={(value) => handleStatusChange(item._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="স্ট্যাটাস" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/travel/view/${item._id}`)}
                    >
                      <Eye className="w-4 h-4 mr-1" /> দেখুন
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
