import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import AllContacts from "../components/Contracts/AllContracts"

function Contracts() {
  const { userIsChief } = useContext(AuthContext)
  const [contracts, setContracts] = useState([])
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
    const newData = await request("/api/contract/get-all")
    setContracts(newData.reverse())
  }

  return (
    <div className="table">
      <h1>Контракти</h1>
      <AllContacts contracts={contracts} />
    </div>
  )
}

export default Contracts
