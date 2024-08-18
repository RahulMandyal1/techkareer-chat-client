import React from "react"

const Message = ({ content, isCurrentUser }) => {
  return (
    <p
      className={`inline-block p-[8px] py-[12px] mb-2 rounded-lg max-w-[70%]  break-words ${
        isCurrentUser ? "ml-auto text-white bg-primary" : "mr-auto bg-secondary"
      }   text-sm bg-white py-2 px-4 shadow rounded-xl `}
    >
      <p>{content}</p>
    </p>
  )
}

export default Message
