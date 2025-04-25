import { DataTypes } from 'sequelize'
import { sequelize } from '../../db.js'


export const GameInvitation = sequelize.define('game_invitations', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    id_user_reciever: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_game: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  