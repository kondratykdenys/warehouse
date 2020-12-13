import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Table, Tag, Space, Alert } from "antd"

function AllContainers({ removeById, containers, refresh, userIsChief }) {
  const columns = [
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, render) => (
        <NavLink to={`container/${render.id}`}>{text}</NavLink>
      ),
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
          Видалити тару {record.name}{" "}
        </a>
      ),
    })
  }

  const data = containers.map(container => ({
    ...container,
    key: container.id,
  }))

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
  )
}

export default AllContainers
