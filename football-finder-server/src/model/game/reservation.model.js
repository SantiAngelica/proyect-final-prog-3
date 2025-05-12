import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const Reservation = sequelize.define('reservations', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    id_schedule: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_game: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_field: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM('pendiente', 'aceptada', 'finalizada'),
        defaultValue: 'pendiente'
    }
},{
    timestamps: false
})