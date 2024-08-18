import React from "react"
import { SearchBar, MessageList } from "components"
import { ChatWindow } from "src/components/Chat"

const Home = () => {
  return (
    <div className="w-full md:w-2/3 h-full">
      <ChatWindow />
    </div>
  )
}

export default Home
