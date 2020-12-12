const express = require("express")
const config = require("config")
const bodyParser = require("body-parser")
const db = require("./models")
const path = require('path')

const app = express()

app.use(bodyParser.json())

app.use("/api/auth", require("./routes/auth.routes"))

const PORT = process.env.PORT || 3306

if ((process.env.NODE_ENV = "production")) {
  app.use(express.static("client/build"))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  });
}

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
