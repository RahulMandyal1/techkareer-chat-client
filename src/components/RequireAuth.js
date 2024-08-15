import React from "react"

const RequireAuth = ({ children }) => {
  const isAuthenticated = false
  if (!isAuthenticated) {
    ;<div className="h-screen flex align-center justify-center">
      <h1 className="text-black">You are not logged in login first</h1>
    </div>
  }
  return <div>{children}</div>
}

export default RequireAuth
