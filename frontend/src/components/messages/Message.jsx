import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser.data._id;
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.data.profilepicture : selectedConversation?.profilepicture;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "bg-gray-300";
	const shakeClass = message.shouldShake ? "shake" : "";

	return (
		<div className={`chat ${chatClassName} max-w-full`}>
			<div className='chat-image avatar'>
				<div className='w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full'>
					<img alt='Profile picture' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-black ${bubbleBgColor} ${shakeClass} pb-2 px-4 text-sm sm:text-base`}>
				{message.message}
			</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{/* Time or other footer content */}</div>
		</div>
	);
};

export default Message;
