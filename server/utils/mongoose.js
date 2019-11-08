const mongoose = require('mongoose')
const config = require('../config/db')


if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true)
}

mongoose.set('bufferCommands', false)

function connectMongoDB(address) {
  try {
    mongoose.connect(address, { 
      useNewUrlParser: true,
      bufferMaxEntries: 0,
      autoReconnect: true,
      poolSize: 5,
    })
    
    const db = mongoose.connection
    db.on('error', (error) => {
      console.log(`MongoDB connecting failed: ${error}`)
    })
    db.once('open', () => {
      console.log('MongoDB connecting succeeded')
    })
    return db
  } catch (error) {
    console.log(`MongoDB connecting failed: ${error}`)
  }
}


const mongoInstance = connectMongoDB(`mongodb://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`)

module.exports = {
  mongo: mongoInstance,
  model: mongoose.model,
  Schema: mongoose.Schema
}
