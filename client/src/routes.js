import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Header from "./components/Header/Header"
import AuthPage from "./pages/AuthPage"
import Clients from "./pages/Clients"
import Client from "./pages/Client"
import Contracts from "./pages/Contracts"
import Contract from "./pages/Contract"
import Ttns from "./pages/Ttns"
import Products from "./pages/Products"
import Product from "./pages/Product"
import Containers from "./pages/Containers"
import Container from "./pages/Container"
import Users from "./pages/Users"

export const useRoutes = (isAuthenticated, userIsChief) => {
  if (isAuthenticated) {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          {userIsChief ? <Route path="/users" component={Users} /> : ""}
          <Route path="/clients" component={Clients} />
          <Route path="/client/:id" component={Client} exect />
          <Route path="/contracts" component={Contracts} />
          <Route path="/contract/:id" component={Contract} />
          <Route path="/ttns" component={Ttns} />
          <Route path="/products" component={Products} />
          <Route path="/product/:id" component={Product} exact />
          <Route path="/containers" component={Containers} />
          <Route path="/container/:id" component={Container} />
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
