import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSocket } from "src/hooks/useSocket"
import { updateMessages } from "src/state/slices/homeSlice"

const SendMessage = () => {
  const [message, setMessage] = useState("")
  const currentUserId = useSelector((state) => state.auth?.user?.userId)
  const selectedUser = useSelector((state) => state.home.selectedUser)
  const dispatch = useDispatch()
  const { socket } = useSocket()

  console.log(socket, "socket")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (e.target.value.trim() === "") {
      return
    }

    // Handle sending the message
    sendMessage(message)
    setMessage("")
  }

  const sendMessage = (content) => {
    dispatch(
      updateMessages({
        message: {
          content: content,
          fromUserId: currentUserId,
          toUserId: selectedUser.userId,
          createdAt: "",
        },
        userId: selectedUser.userId,
      }),
    )
    socket?.emit("private message", { content, toUserId: selectedUser.userId })
  }

  return (
    <div className="bg-white sticky bottom-0  py-8 shadow-lg  border-gray-300">
      <form onSubmit={handleSubmit} className="px-2 containerWrap flex">
        <div className="relative flex-grow">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-16" // Added padding-right to accommodate the button
            type="text"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="absolute top-0 right-0 h-full px-4 py-2 bg-blue-500 text-white rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default SendMessage
