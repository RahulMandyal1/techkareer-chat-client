import React from "react"
import Avatar from "./Avatar"
import { useDispatch, useSelector } from "react-redux"
import MessageListSkeleton from "./Skeleton/MessageListSkeleton"
import { setSelectedUser } from "src/state/slices/homeSlice"

const MessageList = () => {
  const loading = useSelector((state) => state.home.loading)
  const users = useSelector((state) => state.home.usersList)
  const dispatch = useDispatch()
  const messages = useSelector((state) => state.home.messages)

  const handleClick = (user) => {
    dispatch(setSelectedUser(user))
  }

  if (loading) return <MessageListSkeleton />
  return (
    <div className="overflow-y-auto">
      {users?.map((user, index) => (
        <div className="flex flex-row  gap-4 px-6 py-4 border-b" onClick={() => handleClick(user)}>
          <Avatar size={40} src={user?.profileUrl} />
          <div key={index}>
            <p className="font-semibold">
              {user.username} •{" "}
              <span className="font-normal text-[#a3a3a3]">{user?.daysAgo ? user?.daysAgo : 1} days</span>
            </p>
            <RenderLastMessage usersMessages={messages[user.username].messages} user={user} />
          </div>
        </div>
      ))}
    </div>
  )
}

const RenderLastMessage = ({ usersMessages, user }) => {
  const currentUserId = useSelector((state) => state.auth?.user?.userId)

  if (!usersMessages) return null
  const lastIndex = usersMessages?.length
  const message = usersMessages[lastIndex]

  const isCurrentUser = message?.to === currentUserId

  return (
    <p>
      {isCurrentUser ? "You:" : `${user.username} :   `}
      <span className="text-[#bbbbbb]">{user.message?.content}</span>
    </p>
  )
}

export default MessageList
