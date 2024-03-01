import {Record,Bookmark} from "@/interfaces/bookmarks";
import { getBookmarkData } from "@/lib/api";



export default async function Index() {
    const bk = await getBookmarkData();
    console.log(typeof bk)
    return (
        <p>{JSON.stringify(bk.children)}</p>
    );
}
