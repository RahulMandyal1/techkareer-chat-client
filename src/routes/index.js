import React from "react"
import { useRoutes } from "react-router-dom"
import { ROUTES } from "../constant/routesUrl"
import { Home, Login, RegisterUser, PageNotFound } from "pages"
import { RequireAuth } from "src/components"

const Routes = () => {
  const content = useRoutes([
    {
      path: ROUTES.LOGIN_URL,
      element: <Login />,
    },
    {
      path: ROUTES.REGISTER_URL,
      element: <RegisterUser />,
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
