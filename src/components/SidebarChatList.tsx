"use client";
import { pusherClient } from "@/lib/pusher";
import { ToPushKEY, chatHrefConst } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { FC, use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import UnseenToast from "./unseenToast";

interface SidebarChatListProps {
  friends: User[];
  sessionId: string;
}
interface ExtendedMessage extends Message {
  senderName: string;
  senderImg: string;
}

const SidebarChatList: FC<SidebarChatListProps> = ({ friends, sessionId }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);

  useEffect(() => {
    pusherClient.subscribe(ToPushKEY(`user:${sessionId}:chats`));
    pusherClient.subscribe(ToPushKEY(`user:${sessionId}:friends`));

    const chatHandler = (message: ExtendedMessage) => {
      const notiify =
        pathname !==
        `/dashboard/chat/${chatHrefConst(sessionId, message.senderId)}`;

      if (!notiify) return;

      toast.custom((t) => (
        <UnseenToast
          t={t}
          senderMessage={message.text}
          sessionId={sessionId}
          senderId={message.senderId}
          senderImg={message.senderImg}
          senderName={message.senderName}
        />
      ));

      setUnseenMessages((prev) => [...prev, message]);
    };
    const friendHandler = () => {
      router.refresh();
    };

    pusherClient.bind("new-message", chatHandler);
    pusherClient.bind("new-friend", friendHandler);

    return () => {
      pusherClient.unsubscribe(ToPushKEY(`user:${sessionId}:chats`));
      pusherClient.unsubscribe(ToPushKEY(`user:${sessionId}:friends`));
      pusherClient.unbind("new-message", chatHandler);
      pusherClient.unbind("new-friend", friendHandler);
    };
  }, [pathname, sessionId, router ]);

  useEffect(() => {
    if (pathname?.includes("chat")) {
      setUnseenMessages((prev) => {
        return prev.filter((msg) => !pathname.includes(msg.senderId));
      });
    }
  }, [pathname]);

  return (
    <ul role="list" className="max-h-[25rem] overflow-y-auto mx-2 space-y-1">
      {friends.sort().map((friend) => {
        const unseenMessagescount = unseenMessages.filter((unseen) => {
          return unseen.senderId === friend.id;
        }).length;

        return (
          <li key={friend.id}>
            <a
              href={`/dashboard/chat/${chatHrefConst(sessionId, friend.id)}`}
              className="text-white sm:flex hover:text-black hover:bg-indigo-300 group flex items-center gap-x3 rounded-md p-2 text-sm leadin-6 font-semibold"
            >
              {friend.name}
              {unseenMessagescount > 0 ? (
                <div className="bg-indigo-600 font-medium text-xs ml-1 text-white w-4 h-4 rounded-full flex justify-center items-center">
                  {unseenMessagescount}
                </div>
              ) : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
