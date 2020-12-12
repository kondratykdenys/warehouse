import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Header from "./components/Header/Header"
import AuthPage from "./pages/AuthPage"
import Clients from "./pages/Clients"
import Contracts from "./pages/Contracts"
import Ttn from "./pages/Ttn"
import Products from "./pages/Products"
import Containers from "./pages/Containers"
import Users from "./pages/Users"

export const useRoutes = (isAuthenticated, userIsChief) => {
  if (isAuthenticated) {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          {userIsChief ? <Route path="/users" component={Users} /> : ""}
          <Route path="/clients" component={Clients} />
          <Route path="/contracts" component={Contracts} />
          <Route path="/ttns" component={Ttn} />
          <Route path="/products" component={Products} />
          <Route path="/containers" component={Containers} />
          <Redirect to="/products" />
        </Switch>
      </React.Fragment>
    )
  }

  return (
    <Switch>
      <Route to="/" component={AuthPage} />
      <Redirect to="" />
    </Switch>
  )
}
