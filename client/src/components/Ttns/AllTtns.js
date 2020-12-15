import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Table } from "antd"

function AllTtns({ ttns, userIsChief, loading }) {
  const columns = [
    {
      title: "Контракт",
      key: "contract",
      dataIndex: "contract",
      align: "center",
      render: contract => (
        <NavLink to={"contract/" + contract}>{contract}</NavLink>
      ),
    },
    {
      title: "Кількість",
      dataIndex: "count",
      key: "count",
      align: "center",
    },
    {
      title: "Відправлення",
      dataIndex: "departure",
      key: "departure",
      align: "center",
    },
    {
      title: "Адресс",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
  ]

  const data = ttns.map(ttn => {
    return {
      ...ttn,
      key: ttn.id,
    }
  })

  return <Table loading={loading} dataSource={data} columns={columns} />
}

export default AllTtns
