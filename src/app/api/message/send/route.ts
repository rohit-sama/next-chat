import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { nanoid } from "nanoid";
import { Message,  messageValidator } from "@/lib/validations/message";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { text, chatid } = await req.json();
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    const { userId1, userId2 } = chatid.split("--");

    if (userId1 !== session.user.id && userId2 !== session.user.id)
      return new Response("Unauthorized", { status: 401 });

    const Friendid = userId1 === session.user.id ? userId2 : userId1;
    const Friend = (await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`
    )) as string[];
    const isFriend = Friend.includes(Friendid);

    if (!isFriend) return new Response("Unauthorized", { status: 401 });
    const rawsender = (await fetchRedis(
      "get",
      `user:${session.user.id}`
    )) as string;
    const sender = JSON.parse(rawsender) as User;

    const timestamp = Date.now();

    const messageData: Message = {
        id : nanoid(),
        senderId: session.user.id,
        text,
        timestamp,
    }

    const message = messageValidator.parse(messageData);

    await db.zadd(`chat:${chatid}:messages`, {score: timestamp, member: JSON.stringify(message)});


    return new Response("OK")
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Bad Request", { status: 500 });
  }
}
