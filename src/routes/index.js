import React from "react"
import { useRoutes } from "react-router-dom"
import { ROUTES } from "../constant/routesUrl"
import { Home, Login, RegisterUser, PageNotFound } from "pages"
import { RequireAuth } from "src/components"
import { RedirectIfAuthenticated } from "src/components/RedirectIfAuthenticated"

const Routes = () => {
  const content = useRoutes([
    {
      path: ROUTES.LOGIN_URL,
      element: (
        <RedirectIfAuthenticated>
          <Login />
        </RedirectIfAuthenticated>
      ),
    },
    {
      path: ROUTES.REGISTER_URL,
      element: (
        <RedirectIfAuthenticated>
          <RegisterUser />
        </RedirectIfAuthenticated>
      ),
    },
    {
      path: ROUTES.HOME_URL,
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
      children: [],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ])
  return content
}

export default Routes
