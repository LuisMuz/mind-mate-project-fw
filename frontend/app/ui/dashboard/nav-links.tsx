'use client';

import {
  UserGroupIcon,
  HomeIcon,
  ChartBarSquareIcon,
  UserIcon,
  ClockIcon,
  CalendarDaysIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import clsx from 'clsx'
import { Key, ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode } from 'react';
import { UrlObject } from 'url';

interface NavLinksProps {
  userType: string;
  userId: string;
}

interface Link {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & React.RefAttributes<SVGSVGElement>>;
}

export default function NavLinks({ userType, userId }: NavLinksProps) {
  const pathname = usePathname();

  let links: Link[] = [];

  if (userType === 'admin') {
    links = [
      { name: 'Home', href: '/dashboard-admin', icon: HomeIcon },
      { name: 'Users', href: '/dashboard-admin/users', icon: UserGroupIcon },
    ];
  } else if (userType === 'psychologist') {
    links = [
      { name: 'Home', href: `/dashboard-psychologist`, icon: HomeIcon },
      { name: 'Recient Activity', href: `/dashboard-psychologist/activity`, icon: ClockIcon },
      { name: 'Profile', href: `/dashboard-psychologist/profile`, icon: IdentificationIcon },
    ];
  } else {
    links = [
      { name: 'Home', href: `/dashboard-client`, icon: HomeIcon },
      { name: 'Calendary', href: `/dashboard-client/calendar`, icon: CalendarDaysIcon },
      { name: 'Psychologist', href: `/dashboard-client/psychologist`, icon: IdentificationIcon },
    ];
  }

  return (
    <>
      {links.map((link: { icon: any; name: boolean | Key | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<AwaitedReactNode> | null | undefined; href: string | UrlObject; }) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={String(link.name)}
            href={link.href}

            className={clsx("flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{String(link.name)}</p>
          </Link>
        );
      })}
    </>
  );
}
