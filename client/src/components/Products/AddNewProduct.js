import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { Form, Input, Button, Space } from "antd"

function AddNewProduct({ refresh }) {
  const [showAddNewProduct, setShowAddNewProduct] = useState(false)
  const { loading, request, error } = useHttp()

  const message = useMessage()

  useEffect(() => {
    message(error)
  }, [message, error])

  const onFinish = async values => {
    try {
      await request("/api/product/add", "POST", { ...values })
      refresh()
    } catch (e) {}
  }

  const handlerSetShowAddNewProduct = () => {
    setShowAddNewProduct(!showAddNewProduct)
  }

  return !showAddNewProduct ? (
    <Button className="addNew" onClick={handlerSetShowAddNewProduct}>
      Додати новий продукт
    </Button>
  ) : (
    <Form name="basic" onFinish={onFinish} layout="vertical">
      <h1>Додати новий продукт</h1>
      <Form.Item
        label="Назва"
        name="name"
        rules={[{ required: true, message: "Введіть назву продукта!" }]}
      >
        <Input type="text" name="name" />
      </Form.Item>

      <Form.Item
        label="Ціна/грн."
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
          <Button type="link" onClick={handlerSetShowAddNewProduct}>
            Сховати
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default AddNewProduct
