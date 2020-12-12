import React, { useEffect, useState } from "react"
import { Table, Tag, Space, Alert } from "antd"

function AllContainers({ removeById, containers, refresh }) {
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
    {
      title: "Дія",
      key: "action",
      align: "center",
      render: (text, record) => (
        <a
          onClick={() => {
            removeById(record.id)
          }}
        >
          Видалити тару {record.name}{" "}
        </a>
      ),
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={containers}
      pagination={{ pageSize: 10 }}
    />
  )
}

export default AllContainers
