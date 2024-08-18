import React from "react"
import Avatar from "../Avatar"
import { useDispatch, useSelector } from "react-redux"
import MessageListSkeleton from "../Skeleton/MessageListSkeleton"
import { setSelectedUser } from "src/state/slices/homeSlice"

const UsersList = () => {
  const loading = useSelector((state) => state.home.loading)
  const users = useSelector((state) => state.home.usersList)
  const dispatch = useDispatch()
  const selectedUser = useSelector((state) => state.home.selectedUser)
  const messages = useSelector((state) => state.home?.message)

  const handleClick = (user) => {
    dispatch(setSelectedUser(user))
  }

  if (loading) return <MessageListSkeleton />
  return (
    <div className="overflow-y-auto">
      {users?.map((user, index) => (
        <div
          className="flex flex-row gap-4 px-6 py-4 border-b cursor-pointer"
          onClick={() => handleClick(user)}
          key={user?.userId}
        >
          <Avatar size={40} src={user?.profileUrl} />
          <div>
            <p className="font-semibold">
              {user?.username} •{" "}
              <span className="font-normal text-[#a3a3a3]">{user?.daysAgo ? user?.daysAgo : 1} days</span>
            </p>
            {/* <RenderLastMessage usersMessages={messages[user?.userId]?.messages} user={user} /> */}
          </div>
        </div>
      ))}
    </div>
  )
}

const RenderLastMessage = ({ usersMessages, user }) => {
  const currentUserId = useSelector((state) => state.auth?.user?.userId)

  if (!usersMessages || !Array.isArray(usersMessages)) return null
  const lastIndex = usersMessages.length - 1
  const message = usersMessages[lastIndex]

  console.log(message, "message")

  const isCurrentUser = message?.to === currentUserId

  return (
    <p>
      {isCurrentUser ? "You:" : `${user?.username} : `}
      <span className="text-[#bbbbbb]">{message?.content}</span>
    </p>
  )
}

export default UsersList
