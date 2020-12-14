import React, { useContext, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"
import { Table, Badge, Menu, Dropdown, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"
import AddNewTtn from "../components/Ttns/AddNewTtn"
import AllTtns from "../components/Ttns/AllTtns"

function Ttns() {
  const { userIsChief } = useContext(AuthContext)
  const [ttns, setTtns] = useState([])
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
    const newData = await request("/api/ttn/get-all")
    setTtns(newData || [])
  }

  return (
    <div className="table">
      <h1>Товарні накладні</h1>
      {userIsChief ? <AddNewTtn refresh={refresh} /> : ""}
      <AllTtns ttns={ttns} refresh={refresh} />
    </div>
  )
}

export default Ttns
