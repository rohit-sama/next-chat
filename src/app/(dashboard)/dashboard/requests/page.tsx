import FriendRequest from "@/components/FriendRequest";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";
const page = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const incomingSenderID = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequest = await Promise.all(
    incomingSenderID.map(async (senderID) => {
      const sender = (await fetchRedis("get", `user:${senderID}`)) as string;
      const senderParsed = JSON.parse(sender);
      return { senderID, senderEmail: senderParsed.email };
    })
  );
  return <main className='pt-8'>
  <h1 className='font-bold text-5xl mt-20 ml-5 mb-8'> Add a friend</h1>
  <div className="flex flex-col gap-4">
    <FriendRequest incomingFriendRequest={incomingFriendRequest} sessionId={session.user.id}/>
  </div>
</main>
};


export default page;
