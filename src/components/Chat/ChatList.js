import React, { useEffect, useLayoutEffect, useRef } from "react"
import ChatListHeader from "./ChatListHeader"
import Message from "../Message"
import { useDispatch, useSelector } from "react-redux"
import { useSocket } from "src/hooks/useSocket"
import { updateMessages } from "src/state/slices/homeSlice"

const ChatList = () => {
  const currentUserId = useSelector((state) => state.auth?.user?.userId)
  const selectedUser = useSelector((state) => state.home?.selectedUser)
  const messagesList = useSelector((state) => state.home?.messages[selectedUser?.userId]) || []
  const dispatch = useDispatch()
  const { socket } = useSocket()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socket.on("private message", (message) => {
      dispatch(updateMessages({ message: message, userId: message?.fromUserId }))
    })

    return () => {
      socket.off("private message")
    }
  }, [socket])

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesList])

  return (
    <>
      <ChatListHeader />
      <div className="p-4 flex flex-col">
        {messagesList?.messages?.map((message) => (
          <Message
            key={message.messageId}
            content={message.content}
            isCurrentUser={message.fromUserId === currentUserId}
          />
        ))}

        <div ref={messagesEndRef} />
      </div>
    </>
  )
}

export default ChatList
