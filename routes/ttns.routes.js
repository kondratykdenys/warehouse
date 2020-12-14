const { Router } = require("express")
const Ttn = require("../models/index").Ttn

const router = Router()

//api/ttn
router.get("/get-all", async (req, res) => {
  try {
    const ttns = await Ttn.findAll()

    if (!ttns) {
      return res
        .status(400)
        .json({ message: "Поки що немає товарних накладних." })
    }

    return res.json(ttns)
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

    await Ttn.create(body)

    return res.json({ message: "Товарну накладну додано." })
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка при створенні накладної.",
    })
  }
})

module.exports = router
