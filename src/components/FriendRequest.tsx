"use client";

import axios from "axios";
import { Check, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface FriendRequestProps {
  incomingFriendRequest: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequest: FC<FriendRequestProps> = ({
  incomingFriendRequest,
  sessionId,
}) => {
    const router = useRouter();
  const [friendRequest, setFriendRequest] = useState<IncomingFriendRequest[]>(
    incomingFriendRequest
  );

  const acceptFriendRequest = async (senderID: string) => {
    await axios.post("/api/friends/accept", {id: senderID});

    setFriendRequest((prev) => 
    prev.filter((request) => request.senderID !== senderID)
    );

    router.refresh();
  }

  const denyFriendRequest = async (senderID: string) => {
    await axios.post("/api/friends/deny", {id: senderID});

    setFriendRequest((prev) => 
    prev.filter((request) => request.senderID !== senderID)
    );

    router.refresh();
  }

  return (
    <>
      {friendRequest.length === 0 ? (
        <p className="text-sm text-zinc-600"> Nothing To Show Here....</p>
      ) : (
        friendRequest.map((request) => (
          <div key={request.senderID} className="flex gap-4 items-center">
            <UserPlus className="text-black" />
            <p className="text-lg text-zinc-600">{request.senderEmail}</p>
            <button 
            onClick={() => acceptFriendRequest(request.senderID)}
              aria-label="accept friend"
              className="w-8 h-8 bg-green-600 hover:bg-green-700 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <Check className="font-semibold text-white w-3/5 h-3/4" />
            </button>
            <button
            onClick={() => denyFriendRequest(request.senderID)}
              aria-label="deny friend"
              className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <X className="font-semibold text-white w-3/5 h-3/4" />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequest;
