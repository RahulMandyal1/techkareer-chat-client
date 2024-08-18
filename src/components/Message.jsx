import React from "react"

const Message = ({ content, isCurrentUser }) => {
  return (
    <div
      className={`p-2 mb-2 rounded-lg max-w-[70%] break-words ${
        isCurrentUser ? "ml-auto text-white bg-orange-500" : "mr-auto bg-gray-100"
      }`}
    >
      <p>{content}</p>
    </div>
  )
}

export default Message
