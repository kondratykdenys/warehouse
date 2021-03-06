const { Router } = require("express")
const Client = require("../models/index").Client

const router = Router()

//api/client
router.get("/get-all", async (req, res) => {
  try {
    const clients = await Client.findAll()

    if (!clients) {
      return res.status(404).json({ message: "Поки що немає клієнтів." })
    }

    return res.json(clients)
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
    const client = await Client.findByPk(id)

    if (!client) {
      return res.status(404).json({ message: "Клієнта не знайдено." })
    }

    return res.json(client)
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
    const clients = await Client.findAll()

    if (!clients) {
      return res.status(404).json({ message: "Клієнта не знайдено." })
    }

    const filterClients = clients.filter(client => {
      if (client.name.toLowerCase().indexOf(name.toLowerCase()) == 0) {
        return client
      } else if (
        client.lastName.toLowerCase().indexOf(name.toLowerCase()) == 0
      ) {
        return client
      }
    })

    return res.json(filterClients)
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

    const isSuchClient = await Client.findOne({
      where: {
        lastName: body.lastName,
        name: body.name,
      },
    })

    if (isSuchClient) {
      return res.status(404).json({ message: "Такий клієнт вже існує." })
    }

    await Client.create(body)

    return res.json({ message: "Клієнта додано." })
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка при створенні клієнта.",
    })
  }
})

router.post("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params

    const client = await Client.findByPk(id)

    if (client) {
      await client.destroy()
      return res.json({ message: "Клієнт видалений" })
    }

    return res.status(404).json({ message: "Такого клієнта не існує." })
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка. Спробуйте знову.",
    })
  }
})

module.exports = router
