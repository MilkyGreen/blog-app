import List from '@/app/link/[title]/list';
import { getBookmarkData } from "@/app/lib/bookmarksApi";
import { Bookmark } from '@/app/interfaces/bookmarks';
import { ReactNode } from 'react'; // Import ReactNode type
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Content({ params }: Params) { // Specify the return type as Promise<ReactNode>

  const bk = await getBookmarkData();

  return (
    <div className="flex flex-col">
      <List title={params.title} bks={bk.children} />
    </div>
  );
}

type Params = {
  params: {
    title: string;
  };
}