import React, { useEffect } from "react"
import { SocketProvider } from "./SocketContext"
import { useDispatch } from "react-redux"
import { getUsersList } from "src/state/slices/homeSlice"
import UsersList from "./Chat/UsersList"
import SearchBar from "./SearchBar"

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersList())
  }, [])

  return (
    <SocketProvider>
      <div className="flex flex-col h-screen md:flex-row">
        <div className="w-full md:w-1/3 h-full border-r border-gray-300">
          <SearchBar />
          <UsersList />
        </div>

        {children}
      </div>
    </SocketProvider>
  )
}

export default Layout
