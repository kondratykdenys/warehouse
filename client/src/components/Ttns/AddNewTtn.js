import React, { useState, useEffect } from "react"
import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import { Form, Input, Button, Space, AutoComplete } from "antd"
const { Option } = AutoComplete

function AddNewTtn({ refresh }) {
  const [showAddNewTtn, setShowAddNewTtn] = useState(false)
  const { loading, request, error } = useHttp()

  const [relustContract, setResultContract] = useState([])
  const [contract, setContract] = useState(null)

  const message = useMessage()

  useEffect(() => {
    message(error)
  }, [message, error])

  const onFinish = async values => {
    try {
      const data = await request("/api/ttn/add", "POST", { ...values })
      refresh()
    } catch (e) {}
  }

  const handlerSetShowAddNewTtn = () => {
    setShowAddNewTtn(!showAddNewTtn)
  }

  const handlerSearchContract = async value => {
    if (!value) return
    const data = await request(`/api/contract/get-query/${value}`)
    const res = data.map(contract => ({
      ...contract,
      client: {
        ...contract.client,
        name: (contract.client && contract.client.name) || "",
        lastName: (contract.client && contract.client.lastName) || "",
      },
      product: {
        ...contract.product,
        name: (contract.product && contract.product.name) || "",
      },
    }))
    setResultContract(res || [])
  }

  const handlerSetContract = id => {
    setContract(relustContract.find(c => c.id === id))
  }

  return !showAddNewTtn ? (
    <Button className="addNew" onClick={handlerSetShowAddNewTtn}>
      Додати нову накладну
    </Button>
  ) : (
    <Form name="basic" onFinish={onFinish} layout="vertical">
      <h1>Додати нову накладну</h1>
      <Form.Item
        label="Контракт"
        name="contract"
        rules={[{ required: true, message: "Введіть контракт!" }]}
      >
        <AutoComplete
          onSearch={handlerSearchContract}
          placeholder="Контракт"
          onChange={handlerSetContract}
        >
          {relustContract.map(contract => (
            <Option key={contract.id} value={contract.id}>
              {`${contract.id}, клієнт: ${contract.client.name} ${contract.client.lastName} ${contract.product.name}`}
            </Option>
          ))}
        </AutoComplete>
      </Form.Item>
      {contract ? (
        <React.Fragment>
          <p>
            {`${contract.id}, 
               клієнт: ${contract.client.name} ${contract.client.lastName} 
               Прокукт: ${contract.product.name}
                ...
               `}
          </p>
          <Form.Item
            label="Дата відвантаження"
            name="departure"
            rules={[{ required: true, message: "Введіть дату!" }]}
          >
            <Input
              type="date"
              name="departure"
              min={contract.dateOfAssebly}
              max={new Date().toISOString().split("T")[0]}
            />
          </Form.Item>
          <Form.Item
            label="Кількість"
            name="count"
            rules={[{ required: true, message: "Введіть кількість продукту!" }]}
          >
            <Input
              min="0"
              max={contract.countOfProduct - contract.status}
              placeholder="Введіть кільскіть продукту"
              type="number"
              name="count"
            />
          </Form.Item>
        </React.Fragment>
      ) : (
        ""
      )}
      <Form.Item
        label="Адрес"
        name="address"
        rules={[{ required: true, message: "Виберіть адрес!" }]}
      >
        <Input type="text" name="address" />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Додати
          </Button>
          <Button type="link" onClick={handlerSetShowAddNewTtn}>
            Сховати
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default AddNewTtn
