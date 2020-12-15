import React, { useState, useEffect, useContext } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { AuthContext } from "../context/AuthContext"
import AllProducts from "../components/Products/AllProducts"
import AddNewProduct from "../components/Products/AddNewProduct"
import "./table.scss"

function Products() {
  const { userIsChief } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const { loading, request, error } = useHttp()

  const message = useMessage()

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    message(error)
  }, [message, error])

  const refresh = async () => {
    const newData = await request("/api/product/get-all")
    setProducts(newData.reverse())
  }

  const removeById = async id => {
    const remove = await request(`/api/product/remove/${id}`, "POST")
    await refresh()
  }

  return (
    <div className="table">
      <h1>Товари</h1>
      {userIsChief ? <AddNewProduct refresh={refresh} /> : ""}
      <AllProducts
        loading={loading}
        removeById={removeById}
        products={products}
        refresh={refresh}
        userIsChief={userIsChief}
      />
    </div>
  )
}

export default Products
