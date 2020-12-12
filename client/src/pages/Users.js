import React, { useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import AllUsers from "../components/Users/AllUsers"
import "./table.scss"

function Users() {
  const [users, setUsers] = useState([])
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
    const newData = await request("/api/user/get-all")
    setUsers(newData.reverse())
  }

  return (
    <div className="table">
      <h1>Працівники</h1>
      <AllUsers
        users={users}
        refresh={refresh}
      />
    </div>
  )
}

export default Users
