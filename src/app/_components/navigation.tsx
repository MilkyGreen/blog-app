'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


const items = [
  {
    label: 'blogs',
    key: 'blogs',
    href: '/',
  },
  {
    label: 'links',
    key: 'links',
    href: '/links',
  },
  {
    label: 'about',
    key: 'about',
    href: '/about',
  },
];



export default function Topnav() {
  const pathname = usePathname();
  return (
    <div className='flex justify-center items-center m-4 '>
      <div className='w-64'>
      {
        items.map((i) => {
          return (
            <Link 
            className={clsx(
              'm-4 text-blue-500 hover:text-gray-500 text-xl underline',
              {
                'text-gray-500 no-underline': pathname === i.href,
              },
            )}
             key={i.key} href={i.href}>{i.label}</Link>
          );
        })}
        </div>
    </div>
  );
}