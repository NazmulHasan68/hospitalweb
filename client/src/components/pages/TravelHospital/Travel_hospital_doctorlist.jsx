import React from 'react';

const doctors = [
  {
    name: 'ডা. রহমান হোসেন',
    specialty: 'কার্ডিওলজিস্ট',
    experience: '১৫ বছর',
    age: 45,
    image: 'https://via.placeholder.com/60',
  },
  {
    name: 'ডা. শারমিন আক্তার',
    specialty: 'চর্মরোগ বিশেষজ্ঞ',
    experience: '১০ বছর',
    age: 38,
    image: 'https://via.placeholder.com/60',
  },
  {
    name: 'ডা. মাহমুদুল হাসান',
    specialty: 'নিউরোলজিস্ট',
    experience: '১২ বছর',
    age: 42,
    image: 'https://via.placeholder.com/60',
  },
  {
    name: 'ডা. সানজিদা রহমান',
    specialty: 'স্ত্রী রোগ বিশেষজ্ঞ',
    experience: '৮ বছর',
    age: 36,
    image: 'https://via.placeholder.com/60',
  },
  {
    name: 'ডা. আব্দুল করিম',
    specialty: 'সার্জন',
    experience: '২০ বছর',
    age: 50,
    image: 'https://via.placeholder.com/60',
  },
  {
    name: 'ডা. লিজা চৌধুরী',
    specialty: 'পেডিয়াট্রিক্স',
    experience: '৯ বছর',
    age: 34,
    image: 'https://via.placeholder.com/60',
  },
  {
    name: 'ডা. মনিরুজ্জামান',
    specialty: 'ডার্মাটোলজিস্ট',
    experience: '৭ বছর',
    age: 39,
    image: 'https://via.placeholder.com/60',
  },
  {
    name: 'ডা. তাহমিনা ইসলাম',
    specialty: 'নেফ্রোলজিস্ট',
    experience: '১৪ বছর',
    age: 46,
    image: 'https://via.placeholder.com/60',
  },
  {
    name: 'ডা. শওকত আলী',
    specialty: 'অর্থোপেডিক সার্জন',
    experience: '১৩ বছর',
    age: 43,
    image: 'https://via.placeholder.com/60',
  },
  {
    name: 'ডা. নাসরিন জাহান',
    specialty: 'ENT বিশেষজ্ঞ',
    experience: '১১ বছর',
    age: 40,
    image: 'https://via.placeholder.com/60',
  },
];

export default function Travel_hospital_doctorlist() {
  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <h2 className="text-2xl font-bold text-center mb-6">ডাক্তারের তালিকা</h2>
      <div className="overflow-x-auto h-[300px] ">
        <table className="w-full table-auto border shadow-lg  border-gray-300 text-sm">
          <thead className="bg-blue-100 text-gray-800">
            <tr>
              <th className="px-4 py-2 border">ছবি</th>
              <th className="px-4 py-2 border">নাম</th>
              <th className="px-4 py-2 border">বিশেষজ্ঞতা</th>
              <th className="px-4 py-2 border">অভিজ্ঞতা</th>
              <th className="px-4 py-2 border">বয়স</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc, index) => (
              <tr key={index} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="px-4 py-2 border">{doc.name}</td>
                <td className="px-4 py-2 border">{doc.specialty}</td>
                <td className="px-4 py-2 border">{doc.experience}</td>
                <td className="px-4 py-2 border">{doc.age} বছর</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
