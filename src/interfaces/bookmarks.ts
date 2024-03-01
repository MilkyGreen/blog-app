export type Bookmark = {
    title: string;
    url: string;
    type: string;
    id: string;
    pid: string;
    children: Bookmark[];
    lvl: number;
};

export type Record = {
    id: string;
    bookmarks: Bookmark;
};