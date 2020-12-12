import React, { useEffect, useState } from "react"
import { Table, Tag, Space, Alert } from "antd"

function AllProducts({ removeById, products, refresh, userIsChief }) {
  const columns = [
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Ціна",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
  ]

  if (userIsChief) {
    columns.push({
      title: "Дія",
      key: "action",
      align: "center",
      render: (text, record) => (
        <a
          onClick={() => {
            removeById(record.id)
          }}
        >
          Видалити продукт {record.name}{" "}
        </a>
      ),
    })
  }

  return (
    <Table
      columns={columns}
      dataSource={products}
      pagination={{ pageSize: 10 }}
    />
  )
}

export default AllProducts
