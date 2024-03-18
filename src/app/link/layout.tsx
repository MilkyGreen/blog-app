
import LinkNav from './linkNav';
import { getBookmarkData } from "@/app/lib/bookmarksApi";


export default async function Root({
  children,
}: {
  children: React.ReactNode;
}) {

  const bk = await getBookmarkData();
  // console.log("查询到的书签数据："+JSON.stringify(bk.children))

  return (
    <div className='flex'>
      <LinkNav data={bk.children.filter(i => !i.title.startsWith('p') && i.children != null)} />
      <div className='ml-80 pt-10 w-2/3'>
        {children}
      </div>

    </div>
  );

}
