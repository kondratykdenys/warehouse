import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import WareHouse from "./pages/WareHouse"
import AuthPage from "./pages/AuthPage"

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <WareHouse />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route to="/">
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
