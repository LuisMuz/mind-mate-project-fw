'use client'

import { useState } from 'react';
import Image from 'next/image';
import { FormattedUsersTable } from '@/app/lib/definitions';
import pic from '@/public/profile_pic.png';

export default function ClientsTable({
  users,
}: {
  users: FormattedUsersTable[];
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter users based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewNotes = (userId: string) => {
    console.log(`Viewing notes for user with ID: ${userId}`);
  };

  const handleDeleteUser = (userId: string) => {
    console.log(`Deleting user with ID: ${userId}`);
  };

  return (
    <div className="w-full">
      <div className="rounded-xl shadow-sm bg-blue-400 p-4">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <div className="overflow-x-auto rounded-md">
          {/* Users table */}
          <table className="min-w-full rounded-xl text-gray-900 ">
            <thead className="rounded-xl bg-gray-50 text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-gray-900">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group">
                  <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black sm:pl-6">
                    <div className="flex items-center gap-3">
                      <Image
                        src={pic}
                        className="rounded-full"
                        alt={`${user.name}'s profile picture`}
                        width={28}
                        height={28}
                      />
                      <p>{user.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap bg-white px-4 py-5 text-sm text-slate-600">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                    <button
                      onClick={() => handleViewNotes(user.id)}
                      className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      View Notes
                    </button>
                    <button
                      onClick={() => handleViewNotes(user.id)}
                      className="mr-2 px-3 py-1 bg-green-400 text-white rounded hover:bg-green-500"
                    >
                      Create Appointment
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
