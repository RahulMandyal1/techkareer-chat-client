import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateMessages } from "src/state/slices/homeSlice"

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("")
  const currentUserId = useSelector((state) => state.auth?.user?.userId)
  const selectedUser = useSelector((state) => state.home.selectedUser)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle sending the message
    sendMessage(message)
    setMessage("")
  }

  const sendMessage = (content) => {
    dispatch(
      updateMessages({
        message: { content: content, fromUserId: currentUserId, toUserId: selectedUser.userI },
        username: selectedUser.username,
      }),
    )
    socket.emit("private message", { content, toUserId: selectedUser.userId })
  }

  return (
    <div className="sticky bottom-0 bg-white p-4 border-t border-gray-300 min-h-100px]">
      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={1}
          style={{ minHeight: "40px", maxHeight: "120px" }}
        />
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatFooter
