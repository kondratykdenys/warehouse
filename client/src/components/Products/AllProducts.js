import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Table } from "antd"

function AllProducts({ products, userIsChief, loading, removeById }) {
  const columns = [
    {
      title: "Назва",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, render) => (
        <NavLink to={`/product/${render.id}`}>{text}</NavLink>
      ),
    },
    {
      title: "Ціна/грн.",
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

  const data = products.map(product => ({
    ...product,
    key: product.id,
  }))

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 10 }}
    />
  )
}

export default AllProducts
