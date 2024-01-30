const mongoose = require('mongoose')
const mongoUrl = 'mongodb://127.0.01:27017/inotebook'
mongoose.set('strictQuery', false)
const connectMongo = () => {
  mongoose.connect(mongoUrl, () => {
    console.log('connected successfully')
  })
}

module.exports = connectMongo
