import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req : Request, res : Response) {
    try {
        const body = await req.json();
        const session = await getServerSession(authOptions)

        if (!session){
            return new Response ( "unauthorised" , {status: 401})
        }

        const { id: isTodeny } = z.object({ id: z.string() }).parse(body);
        await db.srem(`user:${session.user.id}:incoming_friend_request`, isTodeny);

        return new Response ("ok")
    } catch (error) {
        
        if (error instanceof z.ZodError) {
            return new Response("invalid request", { status: 422 });
        }
        return new Response ("invalid query", { status: 400 })
    
    }
}