import express from 'express'
const app = express()
import { PORT } from './config.js'
import { sequelize } from './db.js'

app.use(express.json())
try {
    await sequelize.sync()
    
} catch (error) {
    console.log(error)
}









app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})