import React, { useState, useEffect, createRef } from "react"
import ReactToPdf from "react-to-pdf"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { Button, Table, Card, Alert, Progress } from "antd"
import { DownloadOutlined } from "@ant-design/icons"

const ref = createRef()

function Contract({ match }) {
  const [contract, setContract] = useState()
  const { loading, request, error, clearError } = useHttp()

  const message = useMessage()

  const refresh = async () => {
    const newData = await request(`/api/contract/get/${match.params.id}`)
    setContract(newData)
    console.log(newData)
  }

  useEffect(() => {
    refresh()
  }, [])

  const columns = [
    {
      title: "Кількість на відправлення",
      dataIndex: "count",
      key: "count",
      align: "center",
    },
    {
      title: "Дата відправлення",
      dataIndex: "departure",
      key: "departure",
      align: "center",
    },
  ]

  const data = []
  if (contract && contract.ttn) {
    contract.ttn.map(t =>
      data.push({
        ...t,
        key: t.id,
      })
    )
  }

  return contract && contract.id ? (
    <div className={"table"} style={{ width: "900px", margin: "0 auto" }}>
      <div style={{ margin: 50 }} ref={ref}>
        <Card
          style={{ width: 600, margin: "auto" }}
          title={`Контакт номер: ${contract.id}`}
        >
          <p>
            <span>Клієнт: </span>
            {contract.client && contract.client.name
              ? `${contract.client.name} ${contract.client.lastName}`
              : "Клієнта видаленно"}
          </p>
          <p>
            <span>Дата заключення контракту: </span> {contract.dateOfAssebly}
          </p>
          <p>
            <span>Продукт:</span>
            {contract.product && contract.product.name
              ? `${contract.product.name} ${contract.product.price}`
              : "Продукт видаленно"}
          </p>
          <p>
            <span>Кількість: </span>
            {contract.countOfProduct}
          </p>
          <p>
            <span>Статус: </span>
            <Progress
              strokeColor={{
                "0%": "#108ee9",
                "100%": "#87d068",
              }}
              style={{ width: "85%" }}
              percent={(contract.status * 100) / contract.countOfProduct}
            />
          </p>
          <p>
            <span>Тара: </span>
            {contract.ttn && contract.ttn.name
              ? `${contract.ttn.name} ${contract.ttn.price}`
              : "Тару видаленно"}
          </p>
        </Card>
        <Table
          style={{ width: 500, margin: "50px auto" }}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      <ReactToPdf targetRef={ref} filename="contract.pdf">
        {({ toPdf }) => (
          <Button
            icon={<DownloadOutlined />}
            style={{ margin: "auto", display: "block" }}
            type={"link"}
            onClick={toPdf}
          >
            Скачать в pdf
          </Button>
        )}
      </ReactToPdf>
    </div>
  ) : (
    <Alert
      message={error}
      type="error"
      onClose={clearError}
      showIcon
      closable
    />
  )
}

export default Contract
