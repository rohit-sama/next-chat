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

    const friendRequestHandler = () => {
      setUnseenRequestCounter((prev) => prev + 1);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);
    return () => {
      pusherClient.unsubscribe(
        ToPushKEY(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  },[sessionId])

  return (
    <Link
      href="/dashboard/requests"
      className="text-gray-700 pt-2 pb-2 -my-4 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-x-3 rounded-md  text-sm leading-6 font-semibold"
    >
      <div className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend requests </p>
      {unseenRequestCounter > 0 ? (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-red-400">{unseenRequestCounter}</div>
      ): null}
    </Link>
  );
};

export default FriendRequestSidebar;
