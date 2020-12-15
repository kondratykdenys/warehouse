import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { Form, Input, Button, Space } from "antd"

function AddNewContainer({ refresh }) {
  const [showAddNewContainer, setShowAddNewContainer] = useState(false)
  const { loading, request, error } = useHttp()

  const message = useMessage()

  useEffect(() => {
    message(error)
  }, [message, error])

  const onFinish = async values => {
    try {
      await request("/api/container/add", "POST", { ...values })
      refresh()
    } catch (e) {}
  }

  const handlerSetShowAddNewContainer = () => {
    setShowAddNewContainer(!showAddNewContainer)
  }

  return !showAddNewContainer ? (
    <Button className="addNew" onClick={handlerSetShowAddNewContainer}>
      Додати новий продукт
    </Button>
  ) : (
    <Form name="basic" onFinish={onFinish} layout="vertical">
      <h1>Додати нову тару</h1>
      <Form.Item
        label="Назва"
        name="name"
        rules={[{ required: true, message: "Введіть назву тари!" }]}
      >
        <Input type="text" name="name" />
      </Form.Item>

      <Form.Item
        label="Ціна в грн."
        name="price"
        rules={[{ required: true, message: "Введіть ціну!" }]}
      >
        <Input type="number" name="price" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Додати
          </Button>
          <Button type="link" onClick={handlerSetShowAddNewContainer}>
            Сховати
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default AddNewContainer
