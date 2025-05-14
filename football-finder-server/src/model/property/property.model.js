import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const Property = sequelize.define('propertys', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name:{  
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false
    },
    zone:{
        type: DataTypes.STRING,
        allowNull: false
    } 
},{
    timestamps: false
})