import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './football-finder.db',
    dialectOptions: {
        foreignKeys: true
    }
})