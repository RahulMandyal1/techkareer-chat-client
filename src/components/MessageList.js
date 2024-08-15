import React from "react"

const messages = [
  {
    name: "Claire",
    daysAgo: 11,
    text: "2nd Hello, I wanted to know more about the product design position opened at Atlassian.",
  },
  {
    name: "Parik",
    daysAgo: 11,
    text: "3rd Hello, I wanted to know more about the product design position opened at Atlassian.",
  },
  {
    name: "Naina",
    daysAgo: 11,
    text: "4th Hello, I wanted to know more about the product design position opened at Atlassian.",
  },
  {
    name: "John",
    daysAgo: 11,
    text: "5th Hello, I wanted to know more about the product design position opened at Atlassian.",
  },
  {
    name: "Kristine",
    daysAgo: 11,
    text: "4th Hello, I wanted to know more about the product design position opened at Atlassian.",
  },
  {
    name: "John",
    daysAgo: 11,
    text: "5th Hello, I wanted to know more about the product design position opened at Atlassian.",
  },
]

const MessageList = () => {
  return (
    <div className="p-4 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className="p-2 mb-2 border-b">
          <p className="font-semibold">
            {msg.name} • {msg.daysAgo} days
          </p>
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  )
}

export default MessageList
