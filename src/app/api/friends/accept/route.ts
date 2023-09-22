import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { ToPushKEY } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id: isToAdd } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      isToAdd
    );

    if (isAlreadyFriends) {
      return new Response("Already friends", { status: 400 });
    }

    const hasfriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      isToAdd
    );

    if (!hasfriendRequest) {
      return new Response("No friend request", { status: 400 });
    }

    const [userRaw, friendRaw] = (await Promise.all([
      fetchRedis("get", `user:${session.user.id}`),
      fetchRedis("get", `user:${isToAdd}`),
    ])) as [string, string];

    const user = JSON.parse(userRaw) as User;
    const friend = JSON.parse(friendRaw) as User;

    await Promise.all([
      pusherServer.trigger(
        ToPushKEY(`user:${isToAdd}:friends`),
        "new-friend",
        user
      ),
      pusherServer.trigger(
        ToPushKEY(`user:${session.user.id}:friends`),
        "new-friend",
        friend
      ),
      db.sadd(`user:${session.user.id}:friends`, isToAdd),
      db.sadd(`user:${isToAdd}:friends`, session.user.id),
      db.srem(`user:${session.user.id}:incoming_friend_requests`, isToAdd),
    ]);

    return new Response("ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("invalid request", { status: 422 });
    }
    return new Response("invalid query", { status: 400 });
  }
}
