import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { Icons, Icon } from "@/components/icons";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";
import FriendRequestSidebar from "@/components/FriendRequestSidebar";
import { fetchRedis } from "@/helpers/redis";
import { getFriendsByUserId } from "@/helpers/get-friends";
import SidebarChatList from "@/components/SidebarChatList";


interface layoutProps {
  children: ReactNode;
}

interface sidebarOptions {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sidebarOptions: sidebarOptions[] = [
  {
    id: 1,
    name: "Add- Friend",
    href: "/dashboard/add",
    Icon: "UserPlus",
  },
];

const layout = async ({ children }: layoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }
 const unseenRequestCount = (
    await fetchRedis( "smembers" , `user:${session.user.id}:incoming_friend_requests`) as User[] 
 ).length;

 const friends = await getFriendsByUserId(session.user.id);

  return (
    <div className="w-full flex  h-screen">
      <div className="flex h-full w-full m-3 max-w-xs scrollbar-hide grow flex-col gap-y-5 overflow-y-auto border-r  p-y-6 ">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Icons.logo className="h-8 w-auto text-white" />
        </Link>

        {friends.length > 0 ? (<div className="text-sm font-semibold leading-6 text-gray-400">      
          Your Chats
        </div>): null}


        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 text-white flex-col gap-y-7">
            <li><SidebarChatList sessionId = {session.user.id} friends={friends} /></li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overwiew
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="text-white hover:text-indigo-300  hover:bg-transparent group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <span className="text-gray border-gray y-200 border-indigo-600 text-indigo-600 hover: flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <FriendRequestSidebar
                InitialUnseenRequestCounter={unseenRequestCount}
                sessionId={session.user.id}
              />
            </li>
            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white">
                <div className="relative h-8 w-8  hover:text-yellow-100">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="Your profile picture"
                  />
                </div>

                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                </div>
              </div>
              <SignOutButton className=" h-full mr-8 aspect-square " />
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default layout;
