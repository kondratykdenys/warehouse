import React, { useEffect, useState, useContext } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"
import AllClients from "../components/Clients/AllClients"
import AddNewClient from "../components/Clients/AddNewClient"
import "./table.scss"

function Clients() {
  const { userIsChief } = useContext(AuthContext)
  const [clients, setClients] = useState([])
  const { loading, request, error, clearError } = useHttp()

  const message = useMessage()

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    message(error)
    clearError()
  }, [message, error])

  const refresh = async () => {
    const newData = await request("/api/client/get-all")
    setClients(newData.reverse())
  }

  const removeById = async id => {
    const remove = await request(`/api/client/remove/${id}`, "POST")
    await refresh()
  }

  return (
    <div className="table">
      <h1>Клієнти</h1>
      {userIsChief ? <AddNewClient refresh={refresh} /> : ""}
      <AllClients
        removeById={removeById}
        clients={clients}
        refresh={refresh}
        userIsChief={userIsChief}
      />
    </div>
  )
}

export default Clients
