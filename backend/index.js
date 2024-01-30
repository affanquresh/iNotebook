const connectMongo = require('./db')
const express = require('express')
const cors = require('cors')
connectMongo()
const app = express()
const port = 5000
app.use(cors())

app.use(express.json())
//Available Routes
app.get('/', (req, res) => {
  res.send('hello affan')
})
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook Backend listening on http://localhost${port}`)
})
