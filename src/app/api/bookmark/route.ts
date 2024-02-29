import { headers } from 'next/headers'
import {getBookmarkData,updateBookmarkData} from "@/lib/api"

export async function POST(request: Request, response: Response) {
    const headersList = headers();
    const API_TOKEN = headersList.get('API_TOKEN');
    if(API_TOKEN != process.env.API_TOKEN){
        return new Response('you have no right to call this!', {
            status: 403
          })
    }
    const body = await request.json();
    console.log(body);
    await updateBookmarkData(body);

    return Response.json({ "status": "ok" });
}
