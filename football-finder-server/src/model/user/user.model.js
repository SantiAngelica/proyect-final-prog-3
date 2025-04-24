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
    nombre: {
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
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    position:{
        type: DataTypes.ENUM('delantero','mediocampista','defensor','arquero'),
    },
    rol:{
        type: DataTypes.ENUM('player', 'admin', 'superadmin'),
        allowNull: false,
        defaultValue: 'player',
    },
    zona: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false,
})