import React, { useEffect, useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"
import { Avatar, Card } from "antd"
import { DeleteOutlined } from "@ant-design/icons"

const { Meta } = Card

function Product({ match }) {
  const { userIsChief } = useContext(AuthContext)
  const [product, setProduct] = useState([])
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
    const newData = await request(`/api/product/get/${match.params.id}`)
    setProduct(newData)
  }

  const remove = async id => {
    const remove = await request(
      `/api/product/remove/${match.params.id}`,
      "POST"
    )
    history.push("/products")
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
                  onClick={() => remove(product.id)}
                  key="remove"
                />,
              ]
            : []
        }
      >
        <Meta
          title={product.name}
          description={"Ціна: " + product.price + " грн."}
        />
      </Card>
    </div>
  )
}

export default Product
