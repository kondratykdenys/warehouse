import React, { useContext, useEffect } from "react"
import { Button, Form, Input } from "antd"
import { useHttp } from "../../hooks/http.hook"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { useMessage } from "../../hooks/message.hook"
import styles from "./Auth.module.scss"

function Register() {
  const auth = useContext(AuthContext)
  const { loading, request, error } = useHttp()

  const message = useMessage()

  useEffect(() => {
    message(error)
  }, [message, error])

  const onFinish = async values => {
    try {
      await request("/api/auth/register", "POST", { ...values })
      auth.login(data.token, data.userIsChief)
    } catch (e) {}
  }

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      layout="vertical"
      className={styles.form}
    >
      <h1>Реєстрація</h1>
      <Form.Item
        label="Ім'я"
        name="name"
        rules={[{ required: true, message: "Введіть ваше ім`я!" }]}
      >
        <Input name="name" />
      </Form.Item>
      <Form.Item
        label="Прізвище"
        name="lastName"
        rules={[{ required: true, message: "Введіть ваше прізвище!" }]}
      >
        <Input name="lastName" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Введіть ваш Email!" }]}
      >
        <Input type="email" name="email" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Введіть ваш пароль!" }]}
      >
        <Input type="password" name="password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Зареєструватися
        </Button>
        <Link to="">
          {" "}
          <Button type="link">Вхід</Button>
        </Link>
      </Form.Item>
    </Form>
  )
}

export default Register
