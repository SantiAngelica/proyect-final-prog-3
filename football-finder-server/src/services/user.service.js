import { User, UserField, UserComent, UserPosition, Game, GameUser } from "../model/index.model.js";

import { validateRoleAndId } from "../utils/validation.utils.js";


const getUsers = async (req, res) => {
    try {
        const users = await User.findAll(
            {
                include: [
                    {
                        model: UserPosition,
                        as: 'positions',
                        attributes: ['position', 'id'],
                    },
                    {
                        model: UserComent,
                        as: 'comments',
                        attributes: ['body', 'id'],
                    },
                    {
                        model: UserField,
                        as: 'fieldsType',
                        attributes: ['field', 'id'],
                    }
                ],
            }
        )
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUserById = async (req, res) => {
    const { id } = req.user
    try {
        const user = await User.findByPk(id, {
            include: [
                {
                        model: UserPosition,
                        as: 'positions',
                        attributes: ['position'],
                    },
                    {
                        model: UserComent,
                        as: 'comments',
                        attributes: ['body'],
                    },
                    {
                        model: UserField,
                        as: 'fieldsType',
                        attributes: ['field'],
                    }
            ],
        })
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getGamesByUserCreator = async (req, res) => {
    const {id} = req.params
    try {
        const user = await User.findByPk(id)
        if (!user) return res.status(404).json({ message: "User not found" })
        const games = await Game.findAll({
            where: {
                id_user_creator: id
            },
            include: [
                {
                    model: GameUser,
                    as: 'players',
                    include: [
                        {
                            model: User,
                            as: 'player',
                            attributes: ['id', 'name', 'email']
                        }
                    ],
                }
            ],
            attributes: ['id', 'missing_players']
        })
        if (games.length === 0) return res.status(404).json({ message: "No games found" })
        res.status(200).json(games)
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
}

const getGamesByUserParticipant = async (req, res) => {
    const {id} = req.params
    try {
        const user = await User.findByPk(id)
        if (!user) return res.status(404).json({ message: "User not found" })

        const games = await GameUser.findAll({
            where: {
                id_user: id
            },
            include: [
                {
                    model: Game,
                    as:'game',
                    include: [
                        {
                            model: User,
                            as: 'userCreator',
                            attributes: ['id', 'name', 'email']
                        }
                    ],
                }
            ],
            attributes: []
        })

        if(games.length === 0) return res.status(404).json({ message: "No games found" })
        return res.status(200).json(games)
    } catch (error) {
        res.status(500).json({ message: error.message })       
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.user
    try {
        const user = await User.findByPk(id)
        if (!user) return res.status(404).json({ message: "User not found" })
        if(!validateRoleAndId(req.user, user.dataValues.id, false, 'admin'))
            return res.send(401).json({message: 'Unauthorized'})

        await UserComent.destroy({ where: { user_id: id } })
        await UserField.destroy({ where: { user_id: id } })
        await UserPosition.destroy({ where: { user_id: id } })
        
        await User.destroy({ where: { id: id } })
        res.status(204).json({message: 'User deleted!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.user
    try {
        const user = await User.findByPk(id)
        if (!user) return res.status(404).json({ message: "User not found" })
        const { name, email, age, zone, user_positions, user_fields } = req.body
        if (!name || !email ||
            !age || !zone || !user_positions || !user_fields) {
            return res.status(400).json({ message: "Missing data" })
        }
         if(!validateRoleAndId(req.user, user.dataValues.id, false, 'admin'))
            return res.send(401).json({message: 'Unauthorized'})
        await user.update({
            age,
            name,
            email,
            zone,
        })
        //destruye los registros en las tablas con el id del usuario para crear nuevos actualizados
        await UserField.destroy({ where: { user_id: id } })
        await UserPosition.destroy({ where: { user_id: id } })

        const newPositions = user_positions.map(p => ({ position: p, user_id: id }));
        await UserPosition.bulkCreate(newPositions);

        const newFields = user_fields.map(f => ({ field: f, user_id: id }));
        await UserField.bulkCreate(newFields);



        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const updateUserRol = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByPk(id)
        if (!user) return res.status(404).json({ message: "User not found" })
        const { role } = req.body
        if (!role) return res.status(400).json({ message: 'Missing data' })
        await User.update({
            rol: role,
        },{where: {id: id}})

        res.status(200).json({message: 'Rol updated!'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

const postComent = async (req, res) => {
    const { rid } = req.params
    try {
        if (!await User.findByPk(rid)) return res.status(404).json({ message: 'User none existent' })
        const { body } = req.body
        if (!body) return res.status(400).json({ message: 'Missing data' })
        UserComent.create({
            user_id: rid,
            id_user_commenter: req.user.id,
            body: body
        })
        res.status(200).json({ message: 'coment add!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteComent = async (req, res) => {
    const { cid } = req.params
    try {
        const coment = UserComent.findByPk(cid)
        if (!coment) return res.status(404).json({ message: 'Comment not found' })
        await UserComent.destroy({where: {id: cid}})
        res.status(204).json({message: 'Comment deleted!'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}




export default {
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
    updateUserRol,
    postComent,
    deleteComent,
    getGamesByUserCreator,
    getGamesByUserParticipant
}