const express = require("express")
const path = require("path")

const app = express()
app.use(express.static(path.join(__dirname, "../build")))

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"))
})

app.listen(process.env.PORT || 8080, () => {
  console.log(
    `Server is listening at http://localhost:${process.env.PORT || 8080}`
  )
})
