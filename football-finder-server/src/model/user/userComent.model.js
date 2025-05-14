import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const UserComent = sequelize.define('user_coments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    body:{
        type: DataTypes.TEXT,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
})