const { Router } = require("express")
const Contract = require("../models/index").Contract
const Client = require("../models/index").Client
const Product = require("../models/index").Product
const Container = require("../models/index").Container
const Ttn = require("../models/index").Ttn

const router = Router()

//api/contract
router.get("/get-all", async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      include: [
        {
          model: Client,
          as: "client",
        },
        {
          model: Product,
          as: "product",
        },
        {
          model: Container,
        },
        {
          model: Ttn,
          as: "ttn",
        },
      ],
    })

    if (!contracts) {
      return res.status(404).json({ message: "Поки що немає контрактів." })
    }

    return res.json(contracts)
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

    await Contract.create(body)

    return res.json({ message: "Контракт додано." })
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка при створенні контракта.",
    })
  }
})

module.exports = router
