import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    rol:{
        type: DataTypes.ENUM('player', 'admin', 'superadmin'),
        allowNull: false,
        defaultValue: 'player',
    },
    zone: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
})