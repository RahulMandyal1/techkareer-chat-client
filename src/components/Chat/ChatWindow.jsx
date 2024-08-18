import React, { useEffect, useRef, useState } from "react"
import ChatFooter from "./ChatFooter"
import ChatList from "./ChatList"
import { useDispatch, useSelector } from "react-redux"
import { io } from "socket.io-client"
import { getUsersList } from "src/state/slices/homeSlice"
import Welcome from "./Welcome"

const dummyMessageData = []

const ChatWindow = () => {
  const userId = useSelector((state) => state.auth?.user?.userId)
  const [messages, setMessages] = useState(dummyMessageData)
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef(null)
  const dispatch = useDispatch()
  const selectedUser = useSelector((state) => state.home.selectedUser)

  useEffect(() => {
    dispatch(getUsersList())
  }, [dispatch])

  useEffect(() => {
    if (!userId) return

    // Initialize socket connection
    socketRef.current = io(import.meta.env.VITE_API_BASE_URL, {
      auth: { userId: userId },
    })

    const socket = socketRef.current

    socket.on("connect", () => {
      setIsConnected(true)
      console.log("Connected to server")
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
      console.log("Disconnected from server")
    })

    socket.on("private message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    socket.on("connect_error", (err) => {
      console.error("Connection error: ", err.message)
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("private message")
      socket.off("connect_error")
      socket.close()
    }
  }, [userId])

  if (Object.keys(selectedUser).length === 0) return <Welcome />
  return (
    <div className="flex flex-col h-screen border-l border-gray-300">
      <div className="flex-grow overflow-y-auto">
        <ChatList messages={messages} />
      </div>
      <ChatFooter socket={socketRef.current} />
    </div>
  )
}

export default ChatWindow
