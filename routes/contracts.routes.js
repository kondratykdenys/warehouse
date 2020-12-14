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

router.get("/get-query/:query", async (req, res) => {
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

    const query = req.params.query.toLowerCase()

    const filteredContracts = contracts.filter(contract => {
      if (
        (contract.id == query ||
        (contract.client &&
          contract.client.name &&
          contract.client.name.toLowerCase().indexOf(query) === 0) ||
        (contract.client &&
          contract.client.lastName &&
          contract.client.lastName.toLowerCase().indexOf(query) === 0) ||
        (contract.product &&
          contract.product.name &&
          contract.product.name.toLowerCase().indexOf(query) === 0) ||
        (contract.Container &&
          contract.Container.name &&
          contract.Container.name.toLowerCase().indexOf(query) === 0) ||
        contract.dateOfAssebly.indexOf(query) === 0) && contract.countOfProduct > contract.status
      ) {
        return contract
      }
    })

    return res.json(filteredContracts)
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

    const contract = await Contract.create(body)

    return res.json({ message: "Контракт додано." })
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка при створенні контракта.",
    })
  }
})

module.exports = router
