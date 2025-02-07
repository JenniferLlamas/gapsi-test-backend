
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./database')

const ProveedoresRouter = require("./routes/ProveedoresRouter");
const AuthRouter = require("./routes/AuthRouter");

app.use(express.json())
app.use(cors('*'))


//Test Route
app.get("/", (request, response) => {
  response.status(200).send(" - API GAPSI WORKING -  ");
});

app.use(
  ProveedoresRouter,
  AuthRouter
)


const PORT = process.env.PORT
const server = app.listen(PORT, () =>
  console.log('Server running on port: ', PORT)
)

module.exports = { app, server }