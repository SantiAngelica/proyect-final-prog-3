import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'

export const PropertyTypeField = sequelize.define('property_type_field', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    id_property: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    field_type:{
        type: DataTypes.ENUM('5','6','7','8','9','11'),
        allowNull: false
    }
},{
    timestamps: false
})