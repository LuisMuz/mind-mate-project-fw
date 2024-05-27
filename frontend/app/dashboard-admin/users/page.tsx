'use client'
import React, { useState, useEffect } from 'react';
import UsersTable from '@/app/ui/dashboard/admin/table';
import { FormattedUsersTable, Role } from '@/app/lib/definitions';

export default function Page() {
  const [users, setUsers] = useState<FormattedUsersTable[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3030/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      // Mapeo del rol antes del filtrado
      const mappedUsers = data.map((user: any) => ({
        ...user,
        role: mapRole(user.role)
      }));
      // Filtrar los usuarios que no sean "ADMIN"
      const filteredUsers = mappedUsers.filter((user: FormattedUsersTable) => user.role !== Role.ADMIN);
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const mapRole = (role: string): Role => {
    switch (role) {
      case 'ADMIN':
        return Role.ADMIN;
      case 'PSYCHOLOGIST':
        return Role.PSYCHOLOGIST;
      case 'CLIENT':
        return Role.CLIENT;
      default:
        return Role.CLIENT; // Otra opción por defecto si es necesario
    }
  };

  return (
    <main>
      <h1 className="text-2xl md:text-4xl font-bold text-gray-800 pb-2">
        Users
      </h1>
      <UsersTable users={users} />
    </main>
  );
}
