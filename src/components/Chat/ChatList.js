import React from "react"
import ChatListHeader from "./ChatListHeader"
import Message from "../Message"
import { useSelector } from "react-redux"

const ChatList = () => {
  const currentUserId = useSelector((state) => state.auth?.user?.userId)
  const selectedUser = useSelector((state) => state.home?.selectedUser)
  const messagesList = useSelector((state) => state.home?.messages[selectedUser?.username]) || []
  console.log(messagesList, "asdfasdf")

  return (
    <>
      <ChatListHeader />
      <div className="p-4">
        {messagesList?.messages?.map((message) => (
          <Message
            key={message.messageId}
            content={message.content}
            isCurrentUser={message.fromUserId === currentUserId}
          />
        ))}
      </div>
    </>
  )
}

export default ChatList
