import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const Game = sequelize.define('games', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    id_user_creator: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    missing_players:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
})