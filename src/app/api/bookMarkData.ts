// pages/api/bookmarkData.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getBookmarkData } from "@/app/lib/bookmarksApi";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await getBookmarkData();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ statusCode: 500, message: err });
    }
}