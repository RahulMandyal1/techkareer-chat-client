import React from "react"
import { ROUTES } from "src/constant/routesUrl"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

const RequireAuth = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN_URL} />
  }

  return <React.Fragment>{children}</React.Fragment>
}

export default RequireAuth
