import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendsValidator } from "@/lib/validations/addFriends";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendsValidator.parse(body.email);

    const isToAdd = await fetchRedis("get", `user:email:${emailToAdd}`) as string;

    if (!isToAdd) {
      return new Response("User not found", { status: 404 });
    }

    const session = await getServerSession(authOptions)
    console.log(session);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (session.user.email === emailToAdd) {
      return new Response("You can't add yourself", { status: 400 });
    }

    const isAlreadyAdded = await fetchRedis('sismember', `user:${isToAdd}:incoming_friend_requests`, session.user.id) as 0 | 1
 if(isAlreadyAdded) {
    return new Response("user is already added", { status: 400 })
 }

 const isAlreadyFriend = await fetchRedis('sismember', `user:${session.user.id}:friends`, isToAdd) as 0|1
 if(isAlreadyFriend) {
    return new Response("You are already friends", { status: 400 })
 }


 db.sadd(`user:${isToAdd}:incoming_friend_requests`, session.user.id);

 return new Response("Friend request sent", { status: 200 });
} catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("invalid request", { status: 422 });
    }
    return new Response("Internal server error", { status: 500 });
}
}
