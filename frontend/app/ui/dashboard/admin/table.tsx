import Image from 'next/image';
import { FormattedUsersTable, Role } from '@/app/lib/definitions';
import pic from '@/public/profile_pic.png';

const getRoleName = (role: Role): string => {
  switch (role) {
    case Role.ADMIN:
      return "Admin";
    case Role.PSYCHOLOGIST:
      return "Psychologist";
    case Role.CLIENT:
      return "Client";
    default:
      return "";
  }
};

export default function UsersTable({
  users,
}: {
    users: FormattedUsersTable[];
}) {
  return (
    <div className="w-full">  
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-blue-400 p-2 md:pt-0">
              <table className="min-w-full rounded-md text-gray-900">
                <thead className="rounded-md bg-blue-400 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Role
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900 rounded-md">
                  {users.map((user) => (
                    <tr key={user.id} className="group rounded-md">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black sm:pl-6 ">
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
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {getRoleName(user.role)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
