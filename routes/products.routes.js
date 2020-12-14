const { Router } = require("express")
const Product = require("../models/index").Product

const router = Router()

//api/product
router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.findAll()

    if (!products) {
      return res.status(404).json({ message: "Поки що немає продуктів." })
    }

    return res.json(products)
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка. Спробуйте знову.",
    })
  }
})

router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({ message: "Не існує такого продукту" })
    }

    return res.json(product)
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка. Спробуйте знову.",
    })
  }
})

router.get("/get-name/:name", async (req, res) => {
  try {
    const { name } = req.params
    const products = await Product.findAll()

    if (!products) {
      return res.status(404).json({ message: "Продукт не знайдено." })
    }

    const filterProducts = products.filter(product => {
      if (product.name.toLowerCase().indexOf(name.toLowerCase()) == 0) {
        return product
      }
    })

    return res.json(filterProducts)
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка. Спробуйте знову.",
    })
  }
})

router.post("/add", async (req, res) => {
  try {
    const body = req.body

    const isSuchProduct = await Product.findOne({
      where: {
        name: body.name,
        price: body.price,
      },
    })

    if (isSuchProduct) {
      return res.status(404).json({ message: "Такий продукт вже існує." })
    }

    await Product.create(body)

    return res.json({ message: "Продукт додано." })
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка при створенні продукта.",
    })
  }
})

router.post("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findByPk(id)

    if (product) {
      await product.destroy()
      return res.json({ message: "Продукт видалений" })
    }

    return res.status(404).json({ message: "Такого товару не існує." })
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка. Спробуйте знову.",
    })
  }
})

module.exports = router
