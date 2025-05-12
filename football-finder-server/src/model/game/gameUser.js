import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const GameUser = sequelize.define('game_user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    id_game: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    timestamps: false
})