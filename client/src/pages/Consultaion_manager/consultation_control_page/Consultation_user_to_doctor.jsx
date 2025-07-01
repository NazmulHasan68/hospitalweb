import React, { useState } from 'react';
import { useGetAllQuery, useUpdateRoleMutation,} from '@/redux/ApiController/authApi';
import { toast } from 'sonner';
import { Search } from 'lucide-react';

export default function Consultation_user_to_doctor() {
  const { data: userlist, isLoading } = useGetAllQuery();
  const [Updaterole, { isLoading: isUpdating }] = useUpdateRoleMutation();
  const [search, setSearch] = useState('');

  const handleRoleChange = async (id, newRole, user) => {
    try {
      if (user.role === 'user') {
        await Updaterole({ id, role: newRole }).unwrap();
        toast.success(`Role updated to "${newRole}" successfully!`);
      } else {
        toast.error("You have no right to update");
      }
    } catch (error) {
      toast.error('Failed to update role.');
    }
  };

  const users = userlist?.student || [];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  if (isLoading) return <p className="text-center text-gray-500">Loading users...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">🧑‍⚕️ User Role Management</h2>

      {/* 🔍 Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or phone..."
          className="pl-10 pr-4 py-2 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 🧑 User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[550px] overflow-auto">
        {filteredUsers.map((user) => (
          <div key={user._id} className="border p-4 rounded shadow bg-white">
            <div className="flex items-center gap-4 relative">
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full border object-cover"
              />
              <div>
                <p className="font-semibold">{user.name}</p>  
                <p className=' absolute top-2 right-2 text-green-500 font-bold'>{user.role}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                <p className="text-xs text-gray-400">Phone: {user.phone}</p>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor={`role-${user._id}`} className="block text-sm font-medium mb-1">
                Role:
              </label>
              <select
                id={`role-${user._id}`}
                className="border rounded px-3 py-1 w-full"
                value={user.role}
                onChange={(e) => handleRoleChange(user._id, e.target.value, user)}
                disabled={isUpdating}
              >
                <option value="user">User</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center mt-8 text-gray-500">No users found.</p>
      )}
    </div>
  );
}
