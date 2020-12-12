import React, { useState, useEffect } from "react"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import AllProducts from "../components/Products/AllProducts"
import AddNewProduct from "../components/Products/AddNewProduct"
import "./table.scss"

function Products() {
  const [products, setProducts] = useState([])
  const { loading, request, error, clearError } = useHttp()

  const message = useMessage()

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    message(error)
    clearError()
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
      <AddNewProduct refresh={refresh} />
      <AllProducts
        removeById={removeById}
        products={products}
        refresh={refresh}
      />
    </div>
  )
}

export default Products
