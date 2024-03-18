'use client';

import React from 'react';
import { Record, Bookmark } from "@/app/interfaces/bookmarks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function Lists({ title, bks }: { title: string, bks: Bookmark[] }) {

  // convert the Bookmark[] to Map use the title as key,children as value
  function convertToMap(data: Bookmark[]): Map<string, Bookmark[]> {
    let map = new Map<string, Bookmark[]>();
    data.forEach((bk) => {
      map.set(bk.title, bk.children);
    });
    return map;
  }

  const map = convertToMap(bks);

  function getListByTitle(title: string): Bookmark[] {
    return map.get(title) || [];
  }

  return (
    <div className='w-500 whitespace-normal mr-40'>

      <ul className='text-sm'>
        {
          getListByTitle(decodeURIComponent(title)).reverse().map((item, index) => {
            return (
              <li key={item.title} className="overflow-hidden w-full border-b transition-colors hover:bg-muted/80 p-4 align-middle">
                <a href={item.url} target="_blank" className="overflow-hidden w-full">{item.title}</a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
