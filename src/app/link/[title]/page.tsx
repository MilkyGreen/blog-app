import List from '@/app/link/[title]/list';
import { getBookmarkData } from "@/app/lib/bookmarksApi";
import { Bookmark } from '@/app/interfaces/bookmarks';
import { ReactNode } from 'react'; // Import ReactNode type
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Content({ params }: Params) { // Specify the return type as Promise<ReactNode>
    
    const bk = await getBookmarkData();

    return (
        <div className="pl-80 m-4 w-full flex flex-col max-w-full">
            {/* <ScrollArea className="w-full h-screenMinusFooter"> */}
            <List title={params.title} bks={bk.children}/>
            {/* </ScrollArea> */}
        </div>
    );
}

type Params = {
    params: {
        title: string;
    };
}