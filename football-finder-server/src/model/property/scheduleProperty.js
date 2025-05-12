import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const ScheduleProperty = sequelize.define('schedule_properties', {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    //FUNCIONA COMO UNA PLANILLA DE HORARIOS, UNA FILA POR CADA TURNO DE JUEGO EN CARA PREDIO, NO EN CADA CANCHA
    id_property: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    schedule: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    timestamps: false
})