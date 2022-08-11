const express = require('express')
require('dotenv').config()
const db = require('./db.js')


const app = express()
const port = process.env.PORT

app.use(express.json())

const MessageRouter = require('./routers/message')
const WebhookRouter = require('./routers/webhook')

app.use('/message', MessageRouter)
app.use('/webhook', WebhookRouter)

app.listen(port, () => {
  console.log(`Mesaage logger listening`)
})
