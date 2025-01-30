import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext'

const Conversation = ({ conversation, lastidx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?._id === conversation._id
  const { onlineUser } = useSocketContext()
  const isOnline = onlineUser.includes(conversation._id)

  return (
    <>
      <div
        className={`flex gap-3 items-center hover:bg-sky-300 rounded p-2 py-1 cursor-pointer 
        ${isSelected ? 'bg-slate-700' : ''}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? 'online' : ''}`}>
          <div className='w-12 h-12 rounded-full overflow-hidden'>
            <img
              src={conversation.profilepicture}
              alt="user avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex justify-between gap-3'>
            <p className='font-bold text-gray-200 text-sm sm:text-base'>
              {conversation.fullname}
            </p>
          </div>
        </div>
      </div>

      {!lastidx && <div className='divider my-3 py-2' />}
    </>
  )
}

export default Conversation
