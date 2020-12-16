import React, { useState, useEffect, createRef } from "react"
import ReactToPdf from "react-to-pdf"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { Button, Table, Card, Alert, Progress, Spin } from "antd"
import { DownloadOutlined } from "@ant-design/icons"

const ref = createRef()

function Contract({ match }) {
  const [contract, setContract] = useState()
  const { loading, request, error } = useHttp()

  const message = useMessage()

  const refresh = async () => {
    const newData = await request(`/api/contract/get/${match.params.id}`)
    setContract(newData)
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
          loading={loading}
          style={{ width: 600, margin: "auto" }}
          title={`Контакт номер: ${contract.id}`}
        >
          <div>
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
            <div style={{ marginBottom: 10 }}>
              <span>Статус: </span>
              <Progress
                strokeColor={{
                  "0%": "#108ee9",
                  "100%": "#87d068",
                }}
                style={{ width: "85%" }}
                percent={parseInt(
                  (contract.status * 100) / contract.countOfProduct
                )}
              />
            </div>
            <p>
              <span>Тара: </span>
              {contract.ttn && contract.ttn.name
                ? `${contract.ttn.name} ${contract.ttn.price}`
                : "Тару видаленно"}
            </p>
          </div>
        </Card>
        <Table
          loading={loading}
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
            Завантажити в pdf
          </Button>
        )}
      </ReactToPdf>
    </div>
  ) : error ? (
    <Alert message={error} type="error" showIcon closable />
  ) : (
    <Spin size="large" style={{ margin: "50px px auto", display: "block" }} />
  )
}

export default Contract
