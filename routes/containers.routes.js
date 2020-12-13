const { Router } = require("express")
const Container = require("../models/index").Container

const router = Router()

//api/container
router.get("/get-all", async (req, res) => {
  try {
    const containers = await Container.findAll()

    if (!containers) {
      return res.status(404).json({ message: "Поки що немає тари." })
    }

    return res.json(containers)
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
    const container = await Container.findByPk(id)

    if (!container) {
      return res.status(400).json({ message: "Такої тари не існує." })
    }

    return res.json(container)
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

    const isSuchContainer = await Container.findOne({
      where: {
        name: body.name,
        price: body.price,
      },
    })

    if (isSuchContainer) {
      return res.status(404).json({ message: "Така тара вже існує." })
    }

    await Container.create(body)

    return res.json({ message: "Тару додано." })
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка при створенні тари.",
    })
  }
})

router.post("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params

    const container = await Container.findByPk(id)

    if (container) {
      await container.destroy()
      return res.json({ message: "Тара видалена." })
    }

    return res.status(404).json({ message: "Такої тари не існує." })
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка. Спробуйте знову.",
    })
  }
})

module.exports = router
