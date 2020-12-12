const { Router } = require("express")
const bcrypt = require("bcrypt")
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const config = require("config")
const User = require("../models/index").User

const router = Router()

// api/auth/register
router.post(
  "/register",
  [
    check("email", "Неправильний Email").isEmail(),
    check("password", "Мінімальна довжина пароля 6 символів").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors, message: "Некоректні данні при реєстрації" })
      }

      const { name, lastName, email, password } = req.body

      const candidate = await User.findOne({ where: { email } })

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Користувач з таким email-ом вже існує" })
      }

      const hashedPassword = await bcrypt.hash(password, 15)
      const user = await User.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        isChief: false,
      })

      const token = jwt.sign(
        {
          userId: user.id,
          userIsChief: user.isChief,
        },
        config.get("jwtToken"),
        { expiresIn: "1h" }
      )

      res.json({ token, userIsChief: user.isChief })
    } catch (e) {
      res.status(500).json({
        error: e.message,
        message: "Сталася помилка. Спробуйте знову.",
      })
    }
  }
)

// api/auth/login
router.post(
  "/login",
  [
    check("email", "Неправильний Email").isEmail(),
    check("password", "Мінімальна довжина пароля 6 символів").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ errors, message: "Некоректні данні при авторизації" })
      }

      const { email, password } = req.body

      const user = await User.findOne({ where: { email } })

      if (!user) {
        return res.json(400).json({ message: "Користувача не знайдено" })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.json(400).json({ message: "Неправильний пароль" })
      }

      const token = jwt.sign(
        {
          userId: user.id,
          userIsChief: user.isChief,
        },
        config.get("jwtToken"),
        { expiresIn: "1h" }
      )

      res.json({ token, userIsChief: user.isChief })
    } catch (e) {
      res.status(500).json({
        error: e.message,
        message: "Сталася помилка. Спробуйте знову.",
      })
    }
  }
)

module.exports = router
