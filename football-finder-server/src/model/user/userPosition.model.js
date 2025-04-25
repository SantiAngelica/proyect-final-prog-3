import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const UserPosition = sequelize.define('user_positions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    position:{
        type: DataTypes.STRING,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
})