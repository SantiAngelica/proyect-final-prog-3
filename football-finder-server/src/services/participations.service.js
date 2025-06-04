import {
    Game, GameInvitation, GameApplication, GameUser, User, Reservation, ScheduleProperty,
    Property, PropertyTypeField
} from "../model/index.model.js";
import { validateRoleAndId } from "../utils/validation.utils.js";

const postInvitation = async (req, res) => {
    const { gameId, recieverId } = req.params
    try {
        const reciever = await User.findByPk(recieverId)
        const game = await Game.findByPk(gameId)
        if (!reciever) return res.status(404).json({ message: 'User not found' })
        if (!game) return res.status(404).json({ message: 'Game not found' })
        if (game.dataValues.id_user_creator == recieverId) {
            return res.status(400).json({ message: 'You cannot invite yourself to your own game' })
        }
        if (!validateRoleAndId(req.user, game.dataValues.id_user_creator, true))
            return res.status(401).json({ message: "Unauthorized" });


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
    const { gameId } = req.params
    const applicantId = req.user.id
    try {
        const applicant = await User.findByPk(applicantId)
        const game = await Game.findByPk(gameId)
        const existingApp = await GameApplication.findAll({
            where:{
                id_user_applicant: applicantId,
                id_game: gameId
            }
        })
        if (!applicant) return res.status(404).json({ message: 'User not found' })
        if (!game) return res.status(404).json({ message: 'Game not found' })
        if (existingApp) return res.status(400).json({message: 'You alredy applied to this game'})
        if (game.dataValues.id_user_creator == applicantId) {
            return res.status(400).json({ message: 'You cannot apply to your own game' })
        }
        if (game.dataValues.missing_players == 0) {
            return res.status(400).json({ message: 'Game is full' })
        }

        if (!validateRoleAndId(req.user, applicant.dataValues.id, true))
            return res.status(401).json({ message: "Unauthorized" });

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
    const uid = req.user.id
    try {
        const invitations = await GameInvitation.findAll({
            where: {
                id_user_reciever: uid
            },
            include: [
                {
                    model: Game,
                    as: 'gameInvited',
                    attributes: ['id', 'missing_players'],
                    include: [
                        {
                            model: User,
                            as: 'userCreator',
                            attributes: ['id', 'name', 'email']
                        },
                        {
                            model: Reservation,
                            as: 'reservation',
                            attributes: ['id', 'date', 'state'],
                            include: [{
                                model: ScheduleProperty,
                                as: 'schedule',
                                attributes: ['id', 'schedule'],
                                include: [{
                                    model: Property,
                                    as: 'property',
                                    attributes: ['id', 'zone', 'adress']
                                }]
                            },
                            {
                                model: PropertyTypeField,
                                as: 'fieldType',
                                attributes: ['field_type'],
                            }]
                        }
                    ]

                }
            ]
        })
        return res.status(200).json(invitations);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const getApplicationsByUserId = async (req, res) => {
    const uid = req.user.id
    try {
        const applications = await GameApplication.findAll({
            where: {
                id_user_applicant: uid
            },
            include: [
                {
                    model: Game,
                    as: 'gameApplied',
                    include: [
                        {
                            model: User,
                            as: 'userCreator',
                            attributes: ['id', 'name', 'email']
                        },
                        {
                            model: Reservation,
                            as: 'reservation',
                            attributes: ['id', 'date', 'state'],
                            include: [{
                                model: ScheduleProperty,
                                as: 'schedule',
                                attributes: ['id', 'schedule'],
                                include: [{
                                    model: Property,
                                    as: 'property',
                                    attributes: ['id', 'zone', 'adress']
                                }]
                            },
                            {
                                model: PropertyTypeField,
                                as: 'fieldType',
                                attributes: ['field_type'],
                            }]
                        }
                    ]
                }
            ]
        })
        return res.status(200).json(applications);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const postAceptInvitation = async (req, res) => {
    const { id } = req.params
    try {
        const invitation = await GameInvitation.findByPk(id)
        if (!invitation) return res.status(404).json({ message: "Invitation not found" });

        const game = await Game.findByPk(invitation.dataValues.id_game)

        if (!game) return res.status(404).json({ message: "Game not found aaaaa" });
        if (game.dataValues.missing_players == 0) {
            return res.status(400).json({ message: 'Game is full' })
        }

        if (!validateRoleAndId(req.user, invitation.dataValues.id_user_reciever, true))
            return res.status(401).json({ message: "Unauthorized" });



        game.update({
            missing_players: game.dataValues.missing_players - 1
        })
        invitation.update({
            state: 'aceptada'
        })
        const game_user = await GameUser.create({
            id_game: invitation.dataValues.id_game,
            id_user: invitation.dataValues.id_user_reciever
        })
        return res.status(201).json({ message: 'Invitation acepted', game_user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error });
    }
}

const postAceptApplication = async (req, res) => {
    const { id } = req.params
    try {
        const application = await GameApplication.findByPk(id)
        if (!application) return res.status(404).json({ message: "Application not found" });
        const game = await Game.findByPk(application.dataValues.id_game)

        if (!game) return res.status(404).json({ message: "Game not found" });
        if (game.dataValues.missing_players == 0) {
            console.log("first")
            return res.status(400).json({ message: 'Game is full' })
        }

        if (!validateRoleAndId(req.user, game.dataValues.id_user_creator, true))
            return res.status(401).json({ message: "Unauthorized" });

        game.update({
            missing_players: game.dataValues.missing_players - 1
        })
        application.update({
            state: 'aceptada'
        })
        const game_user = await GameUser.create({
            id_game: application.dataValues.id_game,
            id_user: application.dataValues.id_user_applicant
        })
        return res.status(201).json({ message: 'Application acepted', game_user })
    } catch (error) {

    }
}

export default {
    postInvitation,
    postApplication,
    getApplicationsByUserId,
    getInvitationsByUserId,
    postAceptInvitation,
    postAceptApplication
}