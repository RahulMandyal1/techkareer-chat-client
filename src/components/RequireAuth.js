import React from "react"
import { ROUTES } from "src/constant/routesUrl"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getTokens } from "src/utils/tokenUtils"

const RequireAuth = ({ children }) => {
  const { accessToken } = getTokens()

  if (!accessToken) {
    return <Navigate to={ROUTES.LOGIN_URL} />
  }

  return <React.Fragment>{children}</React.Fragment>
}

export default RequireAuth
