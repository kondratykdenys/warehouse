import React, { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"
import { Avatar, Card } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

const { Meta } = Card

function Container({ match }) {
  const { userIsChief } = useContext(AuthContext)
  const [container, setContainer] = useState([])
  const { loading, request, error, clearError } = useHttp()

  const message = useMessage()
  const history = useHistory()

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    message(error)
    clearError()
  }, [message, error])

  const refresh = async () => {
    const newData = await request(`/api/container/get/${match.params.id}`)
    setContainer(newData)
  }

  const remove = async id => {
    const remove = await request(
      `/api/container/remove/${match.params.id}`,
      "POST"
    )
    history.push("/containers")
  }

  return (
    <div className="center">
      <Card
        style={{ width: 300, marginTop: 16 }}
        loading={loading}
        actions={
          userIsChief
            ? [
                <DeleteOutlined
                  onClick={() => remove(container.id)}
                  key="remove"
                />,
              ]
            : []
        }
      >
        <Meta
          title={container.name}
          description={"Ціна: " + container.price + " грн."}
        />
      </Card>
    </div>
  )
}

export default Container
