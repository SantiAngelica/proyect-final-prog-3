import { Game, User, Reservation, GameInvitation, GameApplication, GameUser, ScheduleProperty, Property, PropertyTypeField } from "../model/index.model.js";
import { validateNewGame } from "../utils/game.utils.js";
import { sequelize } from "../model/index.model.js";

import { Op } from "sequelize";


const getAvailablesGames = async (req, res) => {
    try {
        const games = await Game.findAll({
            where: {
                missing_players: {
                    [Op.gt]: 0
                }
            }
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

const postAceptReservation = async (req, res) => {
    const { rid } = req.params
    try {
        const reservation = await Reservation.findByPk(rid)
        if (!reservation) return res.status(404).json({ message: "Reservation not found" });
        reservation.update({
            state: 'aceptada'
        })

        res.status(201).json(reservation)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const postInvitation = async (req, res) => {
    const {gameId, recieverId} = req.params
    try {
        const reciever = await User.findByPk(recieverId)
        const game = await Game.findByPk(gameId)
        if(!reciever) return res.status(404).json({message: 'User not found'})
        if(!game) return res.status(404).json({message: 'Game not found'})
        if(game.dataValues.id_user_creator == recieverId){
            return res.status(400).json({message: 'You cannot invite yourself to your own game'})
        }
        const invitation = await GameInvitation.create({
            id_user_reciever: recieverId,
            id_game: gameId
        })
        return res.status(201).json(invitation)
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

const postApplication = async (req, res) => {
    const {gameId, applicantId} = req.params

    try {
        const applicant = await User.findByPk(applicantId)
        const game = await Game.findByPk(gameId)
        if(!applicant) return res.status(404).json({message: 'User not found'})
        if(!game) return res.status(404).json({message: 'Game not found'})
        if(game.dataValues.id_user_creator == applicantId){
            return res.status(400).json({message: 'You cannot apply to your own game'})
        }
        if(game.dataValues.missing_players == 0){
            return res.status(400).json({message: 'Game is full'})
        }
        const application = await GameApplication.create({
            id_user_applicant: applicantId,
            id_game: gameId
        })
        return res.status(201).json(application)
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

const getInvitationsByUserId = async (req, res) => {
    const { uid } = req.params
    try {
        const invitations = await GameInvitation.findAll({
            where: {
                id_user_reciever: uid
            },
            include: [
                {
                    model: Game,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'email']
                        },
                        {
                            model: Reservation,
                            attributes: ['id', 'date', 'state'],
                            include: [{
                                model: ScheduleProperty,
                                include: [{
                                    model: Property,
                                    attributes: ['id','zone','address']
                                }]
                            },
                            {
                                model: PropertyTypeField,
                                attributes: ['field_type'],
                            }]
                        }
                    ]

                }
            ]
        })
        if (invitations.length === 0) return res.status(404).json({ message: "No invitations found" });
        return res.status(200).json(invitations);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const getApplicationsByUserId = async (req, res) => {
    const { uid } = req.params
    try {
        const applications = await Game.findAll({
            where: {
                id_user_creator: uid
            },
            include: [
                {
                    model: GameApplication,
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'name', 'email']
                        }
                    ],
                }
            ]
        })
        if (applications.length === 0) return res.status(404).json({ message: "No applications found" });
        return res.status(200).json(applications);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const postAceptInvitation = async (req, res) => {
    const {id} = req.params
    try {
        const invitation = await GameInvitation.findByPk(id)
        if (!invitation) return res.status(404).json({ message: "Invitation not found" });
        invitation.update({
            state: 'aceptada'
        })
        const game_user = await GameUser.create({
            id_game: invitation.dataValues.id_game,
            id_user: invitation.dataValues.id_user_reciever
        })
        return res.status(201).json({message: 'Invitation acepted', game_user})
    } catch (error) {
        
    }
}

const postAceptApplication = async (req, res) => {
    const {id} = req.params
    try {
        const application = await GameApplication.findByPk(id)
        if (!application) return res.status(404).json({ message: "Application not found" });
        application.update({
            state: 'aceptada'
        })
        const game_user = await GameUser.create({
            id_game: application.dataValues.id_game,
            id_user: application.dataValues.id_user_applicant
        })
        return res.status(201).json({message: 'Application acepted', game_user})
    } catch (error) {
        
    }
}


export default {
    getAvailablesGames,
    getGameById,
    postGame,
    deleteGame,
    postAceptReservation,
    postInvitation,
    postApplication,
    getApplicationsByUserId,
    getInvitationsByUserId,
    postAceptInvitation,
    postAceptApplication
}