'use client'
import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/app/lib/UserContext';
// import { handleSignOut } from '@/app/api/login';
// import { signOut } from '@/auth';

interface SideNavProps {
  userType: string;
  userId: string;
}

export default function SideNav({ userType, userId }: SideNavProps) {
  const router = useRouter();

  function handleSignOut(){
    router.replace("/");
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-30 items-end justify-center rounded-md bg-gray-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Image
            alt="Logo"
            src={logo}
            style={{
              maxHeight: '100%',
              width: "auto",
            }}
            priority={true}
          />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks userType={userType} userId={userId} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div>
          <button onClick={handleSignOut} className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </div>
      </div>
    </div>
  );
}