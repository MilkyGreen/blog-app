
import {Record,Bookmark} from "@/interfaces/bookmarks";
import { getBookmarkData } from "@/lib/api";
import LeftTab from "@/app/links/tabs"

export default async function Index() {
    const bk = await getBookmarkData();
    console.log(JSON.stringify(bk.children))
    return (
        <div className="ml-40">
        <LeftTab data={bk.children} />
        </div>
    );
}

