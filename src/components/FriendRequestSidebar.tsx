"use client";

import { pusherClient } from "@/lib/pusher";
import { ToPushKEY } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

interface FriendRequestSidebarProps {
  sessionId: string;
  InitialUnseenRequestCounter: number;
}

const FriendRequestSidebar: FC<FriendRequestSidebarProps> = ({
  sessionId,
  InitialUnseenRequestCounter,
}) => {
  const [unseenRequestCounter, setUnseenRequestCounter] = useState<number>(
    InitialUnseenRequestCounter
  );

  useEffect(() => {
    pusherClient.subscribe(
      ToPushKEY(`user:${sessionId}:incoming_friend_requests`)
    );
    pusherClient.subscribe(ToPushKEY(`user:${sessionId}:friends`));

    const friendRequestHandler = () => {
      setUnseenRequestCounter((prev) => prev + 1);
    };
    const addedFriendHandler = () => {
      setUnseenRequestCounter((prev) => prev - 1);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);
    pusherClient.bind("new-friend", addedFriendHandler);
    return () => {
      pusherClient.unsubscribe(
        ToPushKEY(`user:${sessionId}:incoming_friend_requests`)
      );

      pusherClient.unsubscribe(ToPushKEY(`user:${sessionId}:friends`));
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
      pusherClient.unbind("new-friend", addedFriendHandler);
    };
  }, [sessionId]);

  return (
    <Link
      href="/dashboard/requests"
      className="text-white pt-2 pb-2 -my-4 hover:text-yellow-50 hover:bg-transparent group flex items-center gap-x-3 rounded-md  text-sm leading-6 font-semibold"
    >
      <div className=" border-indigo-600 text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate hover:text-indigo-300">Friend requests </p>
      {unseenRequestCounter > 0 ? (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-red-400">
          {unseenRequestCounter}
        </div>
      ) : null}
    </Link>
  );
};

export default FriendRequestSidebar;
