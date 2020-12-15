import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import AllContacts from "../components/Contracts/AllContracts"
import AddNewContract from "../components/Contracts/AddNewContract"

function Contracts() {
  const { userIsChief } = useContext(AuthContext)
  const [contracts, setContracts] = useState([])
  const { loading, request, error } = useHttp()

  const message = useMessage()

  const refresh = async () => {
    const newData = await request("/api/contract/get-all")
    setContracts(newData.reverse())
  }

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    message(error)
  }, [message, error])

  return (
    <div className="table">
      <h1>Контракти</h1>
      {userIsChief ? <AddNewContract refresh={refresh} /> : ""}
      <AllContacts contracts={contracts} loading={loading} />
    </div>
  )
}

export default Contracts
