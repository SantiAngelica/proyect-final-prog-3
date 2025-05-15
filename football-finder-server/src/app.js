import express from 'express'
const app = express()
import { PORT } from './config.js'
import { sequelize } from './model/index.model.js'

import userRouter from './routes/user.router.js'
import gameRouter from './routes/game.router.js'
import authRouter from './routes/auth.router.js'
import propertyRouter from './routes/property.router.js'
import participationsRouter from './routes/participations.router.js'


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next()
}
)

try {
    await sequelize.authenticate()
    await sequelize.query('PRAGMA foreign_keys = ON')
    console.log("Conexión con la base de datos establecida.")

    await sequelize.sync() 
    console.log("Base de datos sincronizada.")

    app.use('/api/users', userRouter)
    app.use('/api/games', gameRouter)
    app.use('/api/auths', authRouter)
    app.use('/api/properties', propertyRouter)
    app.use('/api/participations', participationsRouter)

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })

} catch (error) {
    console.log(error)
}









