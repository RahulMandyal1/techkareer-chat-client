import React, { useEffect } from "react"
import ChatList from "./ChatList"
import { useDispatch, useSelector } from "react-redux"
import Welcome from "./Welcome"
import SendMessage from "./SendMessage"

const ChatWindow = () => {
  const userId = useSelector((state) => state.auth?.user?.userId)
  const dispatch = useDispatch()
  const selectedUser = useSelector((state) => state.home.selectedUser)

  if (Object.keys(selectedUser).length === 0) return <Welcome />

  return (
    <div className="flex flex-col h-screen border-l border-gray-300">
      <div className="flex-grow overflow-y-auto">
        <ChatList />
      </div>
      <SendMessage />
    </div>
  )
}

export default ChatWindow
