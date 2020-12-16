import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { Form, Input, Button, Space } from "antd"

function AddNewClient({ refresh }) {
  const [showAddNewClient, setShowAddNewClient] = useState(false)
  const { loading, request, error } = useHttp()

  const message = useMessage()

  useEffect(() => {
    message(error)
  }, [message, error])

  const onFinish = async values => {
    try {
      await request("/api/client/add", "POST", { ...values })
      refresh()
    } catch (e) {}
  }

  const handlerSetShowAddNewProduct = () => {
    setShowAddNewClient(!showAddNewClient)
  }

  return !showAddNewClient ? (
    <Button className="addNew" onClick={handlerSetShowAddNewProduct}>
      Додати нового клієнта
    </Button>
  ) : (
    <Form name="basic" onFinish={onFinish} layout="vertical">
      <h1>Додати нового клієнта</h1>
      <Form.Item
        label="Ім'я"
        name="name"
        rules={[{ required: true, message: "Введіть ім'я кліента!" }]}
      >
        <Input type="text" name="name" />
      </Form.Item>

      <Form.Item
        label="Прізвище"
        name="lastName"
        rules={[{ required: true, message: "Введіть ваш пароль!" }]}
      >
        <Input type="text" name="lastName" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Додати
          </Button>
          <Button type="link" onClick={handlerSetShowAddNewProduct}>
            Сховати
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default AddNewClient
