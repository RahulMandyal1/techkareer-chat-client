import React from "react"

const SearchBar = () => {
  return (
    <div className="p-4 border-b border-gray-300 max-h-[72px]">
      <input
        type="text"
        placeholder="need more time to complete this "
        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
        disabled
      />
    </div>
  )
}

export default SearchBar
