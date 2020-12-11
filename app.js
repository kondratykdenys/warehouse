const express = require("express")
const config = require("config")
const bodyParser = require("body-parser")
const db = require("./models")

const app = express()

app.use(bodyParser.json())
app.use(express.static("public"))

app.use("/api/auth", require("./routes/auth.routes"))

const PORT = config.get("port") || 3306

async function start() {
  try {
    db.sequelize.sync().then(() => {
      app.listen(PORT, () => {
        console.log(`Listen on ${PORT}`)
      })
    })
  } catch (e) {
    console.log(e.message)
    process.exit(1)
  }
}

start()
