import React from 'react';
import { useLoadUserQuery } from '@/redux/ApiController/authApi';

export default function Profile_details() {
  const { data, isLoading, error } = useLoadUserQuery();

  if (isLoading)
    return <div className="p-6 text-center text-gray-600">Loading profile...</div>;

  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        Error loading profile data.
      </div>
    );

  const user = data?.user;

  return (
    <div className="p-6 max-w-4xl mx-auto mt-6">
      <h1 className="text-3xl font-semibold text-blue-800 mb-8 text-center">
        Admin Profile Overview
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 md:flex md:gap-10 items-start border border-gray-200">
        {/* Profile Image */}
        <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-1/3">
          <img
            src={user?.photoUrl}
            alt={user?.name}
            className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover shadow"
          />
        </div>

        {/* Profile Details */}
        <div className="mt-6 md:mt-0 w-full md:w-2/3 space-y-4 text-gray-700 text-[15px]">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <span className="font-semibold text-gray-500">Name:</span>
              <p className="text-blue-900">{user?.name}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Email:</span>
              <p className="text-blue-900">{user?.email}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Phone:</span>
              <p className="text-blue-900">{user?.phone}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Role:</span>
              <p className="text-blue-900 capitalize">{user?.role}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Verified:</span>
              <p
                className={`${
                  user?.isVerified ? 'text-green-600' : 'text-red-500'
                } font-medium`}
              >
                {user?.isVerified ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Active:</span>
              <p
                className={`${
                  user?.isActive ? 'text-green-600' : 'text-red-500'
                } font-medium`}
              >
                {user?.isActive ? 'Yes' : 'No'}
              </p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Joined:</span>
              <p className="text-blue-900">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="font-semibold text-gray-500">Updated:</span>
              <p className="text-blue-900">
                {new Date(user?.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
