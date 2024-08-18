import React from "react"
import { SearchBar, FilterTabs, MessageList } from "components"
import { ChatWindow } from "src/components/Chat"

const Home = () => {
  return (
    <div className="flex flex-col h-screen md:flex-row">
      <div className="w-full md:w-1/3 h-full border-r border-gray-300">
        <SearchBar />
        {/* <FilterTabs /> */}
        <MessageList />
      </div>
      <div className="w-full md:w-2/3 h-full">
        <ChatWindow />
      </div>
    </div>
  )
}

export default Home
