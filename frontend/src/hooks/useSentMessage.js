import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useSentMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        if (!selectedConversation?._id) {
            toast.error("No conversation selected");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: ["POST"],
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!res.ok) {
                throw new Error(`Failed to send message: ${res.statusText}`);
            }

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            // Assuming `message` is an array
            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSentMessage;
