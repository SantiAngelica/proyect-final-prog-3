import { Game, Reservation, User,  } from "../model/index.model.js";
import { validateNewGame } from "../utils/game.utils.js";
import { sequelize } from "../model/index.model.js";
import { validateRoleAndId } from "../utils/validation.utils.js";

import { Op } from "sequelize";


const getAvailablesGames = async (req, res) => {
    try {
        const games = await Game.findAll({
            where: {
                missing_players: {
                    [Op.gt]: 0
                }
            },
            include: [
                {
                    model: User,
                    as: 'userCreator'

                }
            ],
            attributes: ['id', 'missing_players']
        });
        if (games.length === 0) return res.status(404).json({ message: "No games availables" });
        return res.status(200).json(games);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const getGameById = async (req, res) => {
    const { gid } = req.params;
    try {
        const game = await Game.findOne({
            where: {
                id: gid
            }
        });
        if (!game) return res.status(404).json({ message: "Game not found" });
        return res.status(200).json(game);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const postGame = async (req, res) => {
    //date debe ser en formato YYYY-MM-DD
    const { uid, scheduleid, field_type_id, date, missing_players } = req.body;
    if (!uid || !scheduleid || !field_type_id || !missing_players || !date)
        return res.status(400).json({ message: "Missing data" })
    const t = await sequelize.transaction()
    try {
        const validation = await validateNewGame(uid, scheduleid, field_type_id, date);
        if (validation.error) return res.status(validation.status).json({ message: validation.message });


        const newGame = await Game.create({
            id_user_creator: uid,
            missing_players
        }, { transaction: t });

        const newReservation = await Reservation.create({
            id_schedule: scheduleid,
            id_field: field_type_id,
            id_game: newGame.id,
            date: date
        }, { transaction: t });

        await t.commit()

        return res.status(201).json({
            message: "Game created successfully",
            game: newGame, reservation: newReservation
        });
    } catch (error) {
        await t.rollback()
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const deleteGame = async (req, res) => {
    const { id } = req.params;
    const t = await sequelize.transaction();
    try {
        const game = await Game.findByPk(id, { transaction: t });
        if (!game) return res.status(404).json({ message: "Game not found" });

        if(!validateRoleAndId(req.user, game.dataValues.id_user_creator, false, 'admin'))
            return res.status(401).json({ message: "Unauthorized" });


        await game.destroy({ transaction: t });

        const reservation = await Reservation.findOne({
            where: {
                id_game: id
            },
            transaction: t
        });
        if (reservation) {
            await reservation.destroy({ transaction: t });
        }

        await t.commit()
        return res.status(200).json({ message: "Game deleted successfully" });
    } catch (error) {
        await t.rollback()
        return res.status(500).json({ message: "Internal server error", error });
    }
}






export default {
    getAvailablesGames,
    getGameById,
    postGame,
    deleteGame,

}