import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Table, Tag, Space, Alert } from "antd"

function AllClients({ removeById, clients, refresh, userIsChief }) {
  const columns = [
    {
      title: "Ім`я",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, render) => (
        <NavLink to={`/client/${render.id}`}>{text}</NavLink>
      ),
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

  const data = clients.map(client => ({
    ...client,
    key: client.id,
  }))

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
  )
}

export default AllClients
