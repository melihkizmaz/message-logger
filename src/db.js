
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => {
  console.log('Connected to MongoDB')
  }).catch((err) => {
  console.log('Error:', err.message)
})
