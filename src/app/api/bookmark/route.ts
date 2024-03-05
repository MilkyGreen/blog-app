import { headers } from 'next/headers'
import {getBookmarkData,updateBookmarkData} from "@/app/lib/api"
export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(request: Request, response: Response) {
    const headersList = headers();
    const API_TOKEN = headersList.get('API_TOKEN');
    if(API_TOKEN != process.env.API_TOKEN){
        return new Response('you have no right to call this!', {
            status: 403
          })
    }
    const body = await request.json();
    const content = JSON.stringify(body.content[0]);
    
    await updateBookmarkData(content);

    return new Response('done!', {
        status: 200,
    })
}
