import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const GameApplication = sequelize.define('game_aplications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    id_user_applicant: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_game: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada'),
        defaultValue: 'pendiente',
        allowNull: false
    }
}, {
    timestamps: false
})