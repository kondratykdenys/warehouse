import React, { useEffect, useState } from "react"
import { Table, Tag, Space, Alert } from "antd"

function AllClients({ removeById, clients, refresh, userIsChief }) {
  const columns = [
    {
      title: "Ім`я",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Прізвище",
      dataIndex: "lastName",
      key: "lastName",
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
          Видалити клієнта {record.name}{" "}
        </a>
      ),
    })
  }

  return (
    <Table
      columns={columns}
      dataSource={clients}
      pagination={{ pageSize: 10 }}
    />
  )
}

export default AllClients
