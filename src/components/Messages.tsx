"use client";

import { ToPushKEY, cn } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { FC, useEffect, useRef, useState } from "react";
import {format} from "date-fns";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";

interface MessagesProps {
  initialMessages: Message[];
  sessionid: string;
  sessionImg : string | undefined | null ;
  chatPartner : User;
  chatId : string;
}

const Messages: FC<MessagesProps> = ({ initialMessages, sessionid, sessionImg,chatId ,chatPartner }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    pusherClient.subscribe(
      ToPushKEY(`chat:${chatId}`)
    );
    const MessageHandler = (messages : Message) => {
      setMessages((prev) => [messages, ...prev]);
    };

    pusherClient.bind("incoming-message", MessageHandler);
    return () => {
      pusherClient.unsubscribe(
        ToPushKEY(`chat:${chatId}`)
      );
      pusherClient.unbind("incoming-message", MessageHandler);
    };
  }, []);

  const formatTime = (timestamp: number) => {
    return format(timestamp, 'HH:mm')
  }
  return (
    <div
      id="messages"
      className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-bar scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <div ref={scrollDownRef} />

      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionid;

        const hasNextMessageFromSameUser =
          messages[index - 1]?.senderId === messages[index].senderId;
        return (
          <div key={`${message.id}-${message.timestamp}`}>
            <div
              className={cn("flex items-end ", { "justify-end": isCurrentUser })}
            >
              <div
                className={cn(
                  "flex flex-col space-y-2 text-base max-w-xs mx-2",
                  {
                    "oreder-1 items-end": isCurrentUser,
                    "order-2 items-start": !isCurrentUser,
                  }
                )}
              >
                 <span
                  className={cn('px-4 py-2 rounded-lg inline-block', {
                    'bg-indigo-600 text-white': isCurrentUser,
                    'bg-indigo-200 text-gray-900': !isCurrentUser,
                    'rounded-br-none':
                      !hasNextMessageFromSameUser && isCurrentUser,
                    'rounded-bl-none':
                      !hasNextMessageFromSameUser && !isCurrentUser,
                  })}>
                  {message.text}{' '}
                  <span className={cn('ml-2 text-xs', {
                    'text-gray-200' : isCurrentUser,
                    'text-black-500' : !isCurrentUser,
                  })} >
                    {formatTime(message.timestamp)}
                  </span>
                </span>
              </div>

              <div className={cn('relative w-6 h-6', {
                'order-2': isCurrentUser,
                'order-1': !isCurrentUser,
                invisible: hasNextMessageFromSameUser,
              })}>
                <Image
                fill
                src={isCurrentUser? (sessionImg as string) : chatPartner.image
                }
                alt="Profile image"
                referrerPolicy="no-referrer"
                className="rounded-full" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
