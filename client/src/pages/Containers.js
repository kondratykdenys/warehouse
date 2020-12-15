import React, { useState, useEffect, useContext } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"
import AllContainers from "../components/Containers/AllContainers"
import AddNewContainer from "../components/Containers/AddNewContainer"
import "./table.scss"

function Containers() {
  const { userIsChief } = useContext(AuthContext)
  const [containers, setContainers] = useState([])
  const { loading, request, error } = useHttp()

  const message = useMessage()

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    message(error)
  }, [message, error])

  const refresh = async () => {
    const newData = await request("/api/container/get-all")
    setContainers(newData.reverse())
  }

  const removeById = async id => {
    const remove = await request(`/api/container/remove/${id}`, "POST")
    await refresh()
  }

  return (
    <div className="table">
      <h1>Тара</h1>
      {userIsChief ? <AddNewContainer refresh={refresh} /> : ""}
      <AllContainers
        loading={loading}
        removeById={removeById}
        containers={containers}
        userIsChief={userIsChief}
      />
    </div>
  )
}

export default Containers
