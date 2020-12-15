import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { Form, Input, Button, Space, AutoComplete } from "antd"
import { UserOutlined } from "@ant-design/icons"
const { Option } = AutoComplete

function AddNewContract({ refresh }) {
  const [showAddNewContract, setShowAddNewContract] = useState(false)
  const { loading, request, error } = useHttp()

  const message = useMessage()

  useEffect(() => {
    message(error)
  }, [message, error])

  const [relustClients, setResultClinets] = useState([])
  const [relustProducts, setResultProducts] = useState([])
  const [relustContainers, setResultContainers] = useState([])

  const onFinish = async values => {
    try {
      const data = await request("/api/contract/add", "POST", { ...values })
      refresh()
    } catch (e) {}
  }

  const handlerSetShowAddNewContract = () => {
    setShowAddNewContract(!showAddNewContract)
  }

  const handlerSearchClient = async value => {
    if (!value) return

    const data = await request(`/api/client/get-name/${value}`)
    setResultClinets(data || [])
  }
  const handlerSearchProduct = async value => {
    if (!value) return

    const data = await request(`/api/product/get-name/${value}`)
    setResultProducts(data || [])
  }
  const handlerSearchContainer = async value => {
    if (!value) return

    const data = await request(`/api/container/get-name/${value}`)
    setResultContainers(data || [])
  }

  return !showAddNewContract ? (
    <Button className="addNew" onClick={handlerSetShowAddNewContract}>
      Додати новий контракт
    </Button>
  ) : (
    <Form name="basic" onFinish={onFinish} layout="vertical">
      <h1>Додати новий контракт</h1>
      <Form.Item
        label="Клієнт"
        name="user"
        rules={[{ required: true, message: "Введіть клієнта!" }]}
      >
        <AutoComplete onSearch={handlerSearchClient} placeholder="Клієнт">
          {relustClients.map(client => (
            <Option key={client.id} value={client.id}>
              {client.name + " " + client.lastName}
            </Option>
          ))}
        </AutoComplete>
      </Form.Item>
      <Form.Item
        label="Дата заключення контракту"
        name="dateOfAssebly"
        rules={[{ required: true, message: "Введіть дату!" }]}
      >
        <Input
          type="date"
          name="dateOfAssebly"
          max={new Date().toISOString().split("T")[0]}
        />
      </Form.Item>
      <Form.Item
        label="Продукт"
        name="typeOfProduct"
        rules={[{ required: true, message: "Введіть продукт!" }]}
      >
        <AutoComplete onSearch={handlerSearchProduct} placeholder="Продукт">
          {relustProducts.map(product => (
            <Option key={product.id} value={product.id}>
              {product.name + " - ціна: " + product.price + "грн."}
            </Option>
          ))}
        </AutoComplete>
      </Form.Item>
      <Form.Item
        label="Кількість"
        name="countOfProduct"
        rules={[{ required: true, message: "Введіть кількість продукту!" }]}
      >
        <Input
          min="0"
          placeholder="Введіть кільскіть продукту"
          type="number"
          name="countOfProduct"
        />
      </Form.Item>
      <Form.Item
        label="Тара"
        name="container"
        rules={[{ required: true, message: "Виберіть тару!" }]}
      >
        <AutoComplete onSearch={handlerSearchContainer} placeholder="Продукт">
          {relustContainers.map(container => (
            <Option key={container.id} value={container.id}>
              {container.name + " - ціна: " + container.price + "грн."}
            </Option>
          ))}
        </AutoComplete>
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Додати
          </Button>
          <Button type="link" onClick={handlerSetShowAddNewContract}>
            Сховати
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default AddNewContract
