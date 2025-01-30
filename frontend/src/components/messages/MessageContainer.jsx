import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { HiBackspace } from "react-icons/hi2"

const MessageContainer = ({ hidden, sethidden }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const handleClick = () => {
    sethidden(!hidden);
  };

  return (
    <div
      className={`${
        !hidden ? "hidden" : ""
      } w-full overflow-auto h-full flex flex-col bg-black md:bg-transparent`}
    >
      {!selectedConversation ? (
        <NoChatSelected hidden={hidden} sethidden={sethidden} />
      ) : (
        <>
    <div className=" px-4 bg-transparent py-2 mb-2 rounded-3xl">
  <div className="flex justify-between items-center">
    <span className="text-white text-xl sm:text-base md:text-lg">To</span>

    {/* Fullname section */}
    <div className="text-white text-2xl sm:text-lg md:text-xl flex-1 text-center">
      {selectedConversation.fullname}
    </div>

    {/* Back Button */}
    <button
      onClick={handleClick}
      className="text-white sm:text-sm md:text-base text-3xl"
    >
      <HiBackspace className="text-3xl" />
    </button>
  </div>

  <span className="text-gray-900 font-bold text-xs sm:text-sm md:text-base">
    {selectedConversation.fullName}
  </span>
</div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = ({ hidden, sethidden }) => {
  const { authUser } = useAuthContext();

  const handleClick = () => {
    sethidden(!hidden);
  };

  return (
<div className="flex items-center justify-center w-full h-full p-4 flex-col">
  <div className="text-center text-gray-200 font-semibold flex flex-col items-center gap-2">
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
      Welcome 👋 {authUser.data.fullname}
    </p>
    <p className="text-sm sm:text-base md:text-lg">
      Select a chat to start messaging
    </p>
    <TiMessages className="text-4xl sm:text-5xl md:text-6xl text-center" />
  </div>

  {/* This div centers and places the button at the bottom */}
  <div className="mt-auto mb-4 w-full flex justify-center">
    <button
      onClick={handleClick}
      className="px-8 py-4 text-white bg-blue-500 rounded-lg text-2xl hover:bg-blue-600 transition duration-300"
    >
      GO TO CHATS
    </button>
  </div>
</div>

  );
};
