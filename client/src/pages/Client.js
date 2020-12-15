import React, { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"
import { Avatar, Card } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

const { Meta } = Card

function Client({ match }) {
  const { userIsChief } = useContext(AuthContext)
  const [client, setClient] = useState([])
  const { loading, request, error } = useHttp()

  const message = useMessage()
  const history = useHistory()

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    message(error)
  }, [message, error])

  const refresh = async () => {
    const newData = await request(`/api/client/get/${match.params.id}`)
    setClient(newData)
  }

  const remove = async id => {
    const remove = await request(
      `/api/client/remove/${match.params.id}`,
      "POST"
    )
    history.push("/clients")
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
                  onClick={() => remove(client.id)}
                  key="remove"
                />,
              ]
            : []
        }
      >
        <Meta
          avatar={
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          }
          title={client.name + " " + client.lastName}
          description="Клієнт"
        />
      </Card>
    </div>
  )
}

export default Client
