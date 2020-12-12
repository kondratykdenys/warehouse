import React, { useState, useEffect } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import AllContainers from "../components/Containers/AllContainers"
import AddNewContainer from "../components/Containers/AddNewContainer"
import "./table.scss"

function Containers() {
  const [containers, setContainers] = useState([])
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
      <AddNewContainer refresh={refresh} />
      <AllContainers
        removeById={removeById}
        containers={containers}
        refresh={refresh}
      />
    </div>
  )
}

export default Containers
