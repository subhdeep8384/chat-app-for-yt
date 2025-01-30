import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversation";

const Conversations = () => {
  const { loading, conversation } = useGetConversation();

  return (
    <div className="py-2 flex flex-col h-full overflow-y-auto px-3 sm:px-4 lg:px-6 space-y-2">
      {conversation.users?.map((conv, idx) => (
        <Conversation
          key={conv._id}
          conversation={conv}
          lastidx={idx === conversation.users.length - 1}
        />
      ))}

      {loading && (
        <div className="flex justify-center items-center py-4">
          <span className="loading loading-spinner"></span>
        </div>
      )}
    </div>
  );
};

export default Conversations;
