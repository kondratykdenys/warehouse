import React, { useEffect, useState } from "react"
import { useHttp } from "../../hooks/http.hook"
import { Table, Tag, Space, Alert, Checkbox } from "antd"

function AllUsers({ users, refresh }) {
  const { loading, request } = useHttp()

  const updateUser = async id => {
    const newData = await request(`/api/user/update/${id}`, "POST")
    refresh()
  }

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
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Керуючі права",
      dataIndex: "isChief",
      key: "isChief",
      align: "center",
      render: (cheched, record) => (
        <Checkbox checked={cheched} onChange={() => updateUser(record.id)} />
      ),
    },
  ]

  return (
    <Table columns={columns} dataSource={users} pagination={{ pageSize: 10 }} />
  )
}

export default AllUsers
