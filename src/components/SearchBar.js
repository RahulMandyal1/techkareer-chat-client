import React from "react"

const SearchBar = () => {
  return (
    <div className="p-4 border-b border-gray-300 max-h-[72px]">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
      />
    </div>
  )
}

export default SearchBar
