const { Router } = require("express")
const User = require("../models/index").User

const router = Router()

//api/user
router.get("/get-all", async (req, res) => {
  try {
    const users = await User.findAll()

    if (!users) {
      return res.status(404).json({ message: "Поки що немає працівників." })
    }

    return res.json(users)
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка. Спробуйте знову.",
    })
  }
})

router.post("/update/:id", async (req, res) => {
  try {

    const { id } = req.params

    const user = await User.findByPk(id)

    if (user) {
      user.isChief = !user.isChief
      user.save()
      return res.json({message: 'Права змінено.'})
    }

    return res.status(200).json({message: 'Працівника не знайдено.'})
  } catch (e) {
    res.status(500).json({
      error: e.message,
      message: "Сталася помилка при створенні продукта.",
    })
  }
})


module.exports = router
