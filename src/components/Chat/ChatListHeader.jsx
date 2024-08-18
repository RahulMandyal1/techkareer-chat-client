import React from "react"
import Avatar from "../Avatar"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedUser } from "src/state/slices/homeSlice"
import { setTokens } from "src/utils/tokenUtils"
import { resetAuth } from "src/state/slices/authSlice"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "src/constant/routesUrl"

const ChatListHeader = ({ isOnline = true, typingStatus = "" }) => {
  const selectedUser = useSelector((state) => state.home.selectedUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOnClose = () => {
    dispatch(setSelectedUser({}))
  }

  const handleLogout = () => {
    setTokens({ accessToken: "" })
    dispatch(resetAuth())
    navigate(ROUTES.LOGIN_URL)
  }

  return (
    <div className="min-h-[62px] bg-[#f6f6f6] flex flex-row justify-between items-center pr-8">
      <div className="flex items-center gap-4 px-4">
        <Avatar size={40} src={selectedUser?.profileUrl} />

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-800">{selectedUser.username}</p>
            <div className={`w-2.5 h-2.5 rounded-full ${isOnline ? "bg-green-500" : "bg-red-500"}`}></div>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
              logout
            </button>
          </div>
          <div className="text-sm text-gray-500">{typingStatus ? typingStatus : "Last seen recently"}</div>
        </div>
      </div>
      <div onClick={handleOnClose}>close</div>
    </div>
  )
}

export default ChatListHeader
