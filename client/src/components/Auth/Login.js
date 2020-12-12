import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Form, Input } from "antd"
import { useHttp } from "../../hooks/http.hook"
import { AuthContext } from "../../context/AuthContext"
import { useMessage } from "../../hooks/message.hook"

function Register() {
  const auth = useContext(AuthContext)
  const { loading, request, error, clearError } = useHttp()

  const message = useMessage()

  useEffect(() => {
    message(error)
    clearError()
  }, [message, error])

  const onFinish = async values => {
    try {
      const data = await request("/api/auth/login", "POST", { ...values })
      auth.login(data.token, data.userIsChief)
    } catch (e) {}
  }

  return (
    <Form name="basic" onFinish={onFinish}>
      <h1>Вхід</h1>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Введіть ваш Email!" }]}
      >
        <Input style={{ width: "400px" }} type="email" name="email" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введіть ваш пароль!" }]}
      >
        <Input style={{ width: "400px" }} type="password" name="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Вхід
        </Button>
        <Link to="register">
          <Button type="link">Зареєструватися</Button>
        </Link>
      </Form.Item>
    </Form>
  )
}

export default Register
