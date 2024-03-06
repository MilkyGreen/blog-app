import { Post } from "@/app/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { sql } from '@vercel/postgres';
import {Record,Bookmark} from "@/app/interfaces/bookmarks";
import { revalidatePath } from 'next/cache';

const postsDirectory = join(process.cwd(), "_posts");
const bookmarkRecordId = 1;

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

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