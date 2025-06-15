import React, { useState } from 'react';

export default function Profile() {
  // Example static user data — replace with your API data
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+8801700000000',
    role: 'Medicine Manager',
    photoUrl: 'https://i.pravatar.cc/150?img=5',
    address: '123 Main St, Dhaka, Bangladesh',
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">👤 Profile</h1>

      <div className="flex flex-col items-center mb-6">
        <img
          src={user.photoUrl}
          alt={user.name}
          className="w-28 h-28 rounded-full object-cover mb-4 shadow"
        />
        {!editMode ? (
          <>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.role}</p>
          </>
        ) : (
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded px-3 py-1 text-center w-full"
          />
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          {!editMode ? (
            <p>{user.email}</p>
          ) : (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded px-3 py-1 w-full"
            />
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone</label>
          {!editMode ? (
            <p>{user.phone}</p>
          ) : (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded px-3 py-1 w-full"
            />
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Address</label>
          {!editMode ? (
            <p>{user.address}</p>
          ) : (
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded px-3 py-1 w-full"
            />
          )}
        </div>
      </div>

      <div className="mt-6 text-center">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mr-3 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
