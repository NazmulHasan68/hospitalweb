import React from "react";
import { useLoadUserQuery } from "@/redux/ApiController/authApi";
import { useGetTravelHelpByIdQuery } from "@/redux/ApiController/TravelApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function User_travel() {
  const { data: userData, isLoading: userLoading } = useLoadUserQuery();
  const userId = userData?.user?._id;

  const {
    data: travelHelps,
    isLoading: helpLoading,
    isError,
  } = useGetTravelHelpByIdQuery(userId, {
    skip: !userId,
  });

  if (userLoading || helpLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">তথ্য লোড হচ্ছে...</span>
      </div>
    );
  }

  if (isError || !travelHelps?.length) {
    return (
      <div className="text-center text-gray-500 py-12">
        🚫 কোনো আবেদন পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-4 pb-4 px-4">
      <h2 className="text-xl font-bold text-center mb-8">📝 আপনার আবেদনসমূহ</h2>

      <div className="grid gap-6 h-[500px] overflow-auto">
        {travelHelps.map((item, index) => (
          <Card key={item._id}>
            <CardHeader>
              <CardTitle className="text-md">
                আবেদন #{index + 1} —  
                 <span
                  className={
                    item.status === "approved"
                      ? "text-green-600"
                      : item.status === "rejected"
                      ? "text-red-600"
                      : item.status === "pending"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }
                >
                   {item.status}
                </span>
              </CardTitle>
            </CardHeader>

            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <p><strong>👤 রোগীর নাম:</strong> {item.patientName}</p>
              <p><strong>📱 মোবাইল:</strong> {item.phone}</p>
              <p><strong>📧 ইমেইল:</strong> {item.email}</p>
              <p><strong>🎂 বয়স:</strong> {item.age}</p>
              <p><strong>🏥 পছন্দের হাসপাতাল:</strong> {item.preferredHospital || "N/A"}</p>
              <p><strong>🌆 শহর:</strong> {item.preferredCity || "N/A"}</p>
              <p><strong>🌍 দেশ:</strong> {item.preferredCountry}</p>
              <p><strong>🕒 সময়:</strong> {new Date(item.submittedAt).toLocaleString("bn-BD")}</p>
              <p className="md:col-span-2"><strong>📝 চিকিৎসার বিবরণ:</strong> {item.medicalCondition}</p>

              {item.documents?.length > 0 && (
                <div className="md:col-span-2 mt-2">
                  <p className="font-semibold mb-1">📎 সংযুক্ত ডকুমেন্ট:</p>
                  <div className="flex flex-wrap gap-3">
                    {item.documents.map((doc, i) => (
                      <a
                        key={i}
                        href={`/public/apply/${doc}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-xs break-all"
                      >
                        ডকুমেন্ট {i + 1}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
