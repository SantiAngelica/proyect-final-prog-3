import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const UserField = sequelize.define('user_fields', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    field:{
        type: DataTypes.INTEGER,
    },
    user_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps: false
})