import { FormattedUsersTable, Role } from '@/app/lib/definitions';
import ClientsTable from '@/app/ui/dashboard/psychologist/clients_table';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard CLient',
};
 
export default function Page() {

    const users: FormattedUsersTable[] = [
        {
          id: "1",
          name: "Jarvis Stark",
          email: "jsk@example.com",
          role: Role.CLIENT,
        },
        {
          id: "2",
          name: "Jane Smith",   
          email: "jane@example.com",
          role: Role.CLIENT,
        },
        {
          id: "3",
          name: "Michael Johnson",
          email: "michael@example.com",
          role: Role.CLIENT,
        },
        {
          id: "4",
          name: "Santiago Bernal",
          email: "santi@example.com",
          role: Role.CLIENT,
        },
        {
          id: "5",
          name: "David Lee",
          email: "david@example.com",
          role: Role.CLIENT,
        },
      ];
      
    return (
        <main>
            <h1 className="mb-4 text-2xl md:text-4xl font-bold text-gray-800 pb-2">
                Users
            </h1>
            <ClientsTable users={users} />
        </main>
    );

}