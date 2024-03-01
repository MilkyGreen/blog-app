import {Record,Bookmark} from "@/interfaces/bookmarks";
import { getBookmarkData } from "@/lib/api";



export default function Index() {
    const bk = getBookmarkData();
    return (
        <p>{JSON.stringify(bk)}</p>
    );
}
