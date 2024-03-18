'use server'

import { Post } from "@/app/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { sql } from '@vercel/postgres';
import {Record,Bookmark} from "@/app/interfaces/bookmarks";
import { revalidatePath } from 'next/cache';

const bookmarkRecordId = 1;

export async function getBookmarkData(){
  const data = await sql<Record>`SELECT * from record where id = ${bookmarkRecordId}`;
  const bmstr = data.rows[0].bookmarks;
  // const bm = JSON.parse(bmstr) as Bookmark;
  return bmstr;
}

export async function updateBookmarkData(bmstr:string){

  // await sql<Record>`DELETE FROM record WHERE id = ${bookmarkRecordId}`;
  // console.log("准备插入数据库的数据"+bmstr);
  // await sql<Record>`INSERT INTO record (id,bookmarks) values(${bookmarkRecordId},${bmstr})`;

  // console.log("准备插入数据库的数据"+bmstr);
  await sql<Record>`UPDATE record set bookmarks= ${bmstr} WHERE id = ${bookmarkRecordId}`;
  revalidatePath("/links");
}