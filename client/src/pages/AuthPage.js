import React from "react"
import { Switch, Route } from "react-router-dom"
import Register from "../components/Auth/Register"
import Login from "../components/Auth/Login"

function AuthPage() {
  return (
    <div className="container">
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/" component={Login} />
      </Switch>
    </div>
  )
}

export default AuthPage
