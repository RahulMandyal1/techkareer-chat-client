import React from "react"

const SkeletonLoader = () => {
  return (
    <div className="flex flex-row justify-between gap-4 px-6 py-4 border-b min-h-[105px]">
      <div className="bg-gray-300 rounded-full h-10 w-10 animate-pulse"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
      </div>
    </div>
  )
}

const MessageListSkeleton = () => {
  return (
    <div className="overflow-y-auto">
      {Array.from({ length: 8 }).map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </div>
  )
}

export default MessageListSkeleton
