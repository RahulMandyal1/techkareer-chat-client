import React from "react"
import { useSelector } from "react-redux"
import { getTokens } from "src/utils/tokenUtils"

export const RedirectIfAuthenticated = ({ children }) => {
  const { accessToken } = getTokens()

  if (accessToken) return

  return <div>{children}</div>
}
