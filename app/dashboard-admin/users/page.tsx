import { FormattedUsersTable } from '@/app/lib/definitions';
import { Role } from '@/app/lib/definitions'; 
import UsersTable from '@/app/ui/dashboard/admin/table';

const users: FormattedUsersTable[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: Role.ADMIN,
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
    name: "Emily Brown",
    email: "emily@example.com",
    role: Role.PSYCHOLOGIST,
  },
  {
    id: "5",
    name: "David Lee",
    email: "david@example.com",
    role: Role.CLIENT,
  },
];

export default function Page() {

    return (
        <main>
            <h1 className="mb-4 text-xl md:text-2xl">
                Users
            </h1>
            <UsersTable users={users} />
        </main>
    );
}