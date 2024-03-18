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
  // {
  //   label: 'links',
  //   key: 'links',
  //   href: '/links',
  // },
  {
    label: 'about',
    key: 'about',
    href: '/about',
  },
  {
    label: 'link',
    key: 'link',
    href: '/link',
  },
];


export default function Topnav() {
  const pathname = usePathname();
  return (
    <nav className='flex justify-center items-center pb-4 pt-4 mt-0 m-4 fixed top-0 w-full border-b backdrop-filter backdrop-blur-xl bg-opacity-40 border-gray-200'>
      <div className='w-64'>
      {
        items.map((i) => {
          return (
            <Link 
            className={clsx(
              'ml-4 mr-4 text-blue-500 hover:text-gray-500 text-xl underline',
              {
                'text-gray-500 no-underline': pathname.split('/')[1]===i.href.substring(1),
              },
            )}
             key={i.key} href={i.href}>{i.label}</Link>
          );
        })}
        </div>
        
    </nav>
  );
}