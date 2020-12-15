import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Table, Progress } from "antd"

function AllContracts({ contracts, loading }) {
  const expandedRowRender = contract => {
    const columns = [
      {
        title: "Контракт",
        dataIndex: "contract",
        key: "contract",
      },
      {
        title: "Кількість на відправлення",
        dataIndex: "count",
        key: "count",
        sorter: (a, b) => new Date(a.data) - new Date(b.data),
      },
      {
        title: "Дата відправлення",
        dataIndex: "departure",
        key: "departure",
        sorter: (a, b) => new Date(a.data) - new Date(b.data),
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
    return <Table columns={columns} dataSource={data} pagination={false} />
  }

  const columns = [
    {
      title: "Клієнт",
      dataIndex: "user",
      key: "user",
      render: user => {
        if (user.link)
          return <NavLink to={"client/" + user.id}>{user.name}</NavLink>
        return <span>{user.name}</span>
      },
    },
    {
      title: "Дата заключення контракту",
      dataIndex: "data",
      key: "date",
      sorter: (a, b) => new Date(a.data) - new Date(b.data),
    },
    {
      title: "Продукт",
      dataIndex: "product",
      key: "product",
      render: product => {
        if (product.link)
          return <NavLink to={"product/" + product.id}>{product.name}</NavLink>
        return <span>{product.name}</span>
      },
    },
    {
      title: "Кількість",
      dataIndex: "count",
      key: "count",
      sorter: (a, b) => a.count - b.count,
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: status => (
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          style={{ width: 150 }}
          percent={status.percent}
          status={status.percent < 100 ? "active" : ""}
        />
      ),
    },
    {
      title: "Тара",
      dataIndex: "container",
      key: "container",
      render: container => {
        if (container.link)
          return (
            <NavLink to={"container/" + container.id}>{container.name}</NavLink>
          )
        return <span>{container.name}</span>
      },
    },
    {
      title: "Дія",
      dataIndex: "pdf",
      key: "pdf",
      render: (text, render) => (
        <NavLink to={`contract/${render.id}`}>Більше</NavLink>
      ),
    },
  ]

  const data = contracts.map(contract => ({
    ...contract,
    key: contract.id,
    data: contract.dateOfAssebly,
    count: contract.countOfProduct,
    user: {
      id: contract.user,
      name:
        contract.client && contract.client.name
          ? contract.client.name + " " + contract.client.lastName
          : "Клієнта видаленно",
      link: contract.client && contract.client.name ? true : false,
    },
    product: {
      id: contract.typeOfProduct,
      name:
        contract.product && contract.product.name
          ? contract.product.name
          : "Товар видаленно",
      link: contract.product && contract.product.name ? true : false,
    },
    container: {
      id: contract.container,
      name:
        contract.Container && contract.Container.name
          ? contract.Container.name
          : "Тару видаленно",
      link: contract.Container && contract.Container.name ? true : false,
    },
    status: {
      percent: (contract.status * 100) / contract.countOfProduct,
    },
  }))

  return (
    <Table
      className="components-table-demo-nested"
      loading={loading}
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={data}
    />
  )
}

export default AllContracts
