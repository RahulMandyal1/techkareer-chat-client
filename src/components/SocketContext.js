import React, { createContext, useEffect, useState } from "react"
import { io } from "socket.io-client"
import { useDispatch, useSelector } from "react-redux"
import { setActiveUsers } from "src/state/slices/homeSlice"

// Create SocketContext
export const SocketContext = createContext()

// SocketProvider component
export const SocketProvider = ({ children }) => {
  const userId = useSelector((state) => state.auth?.user?.userId)
  const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userId) return

    const socket = io(import.meta.env.VITE_API_BASE_URL, {
      auth: { userId: userId },
    })

    socket.on("connect", () => {
      console.log("Connected to server")
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from server")
    })

    // Listen for the "active users" event
    socket.on("active users", (users) => {
      dispatch(setActiveUsers(users))
    })

    setSocket(socket)

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("active users")
      socket.close()
    }
  }, [userId])

  return <SocketContext.Provider value={{ socket: socket }}>{children}</SocketContext.Provider>
}
