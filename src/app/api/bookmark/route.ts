

export async function POST(request: Request,response:Response) {
    const str = request.body;
    console.log(str);
    return Response.json({"status":"ok"})
}
