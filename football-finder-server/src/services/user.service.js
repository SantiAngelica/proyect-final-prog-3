import { User } from "../model/index.model.js";
import { UserComent } from "../model/index.model.js";
import { UserPosition } from "../model/index.model.js";
import { UserField } from "../model/index.model.js";


const getUsers = async (req, res) => {
    try {
        const users = await User.findAll(
            {
                include: [
                    {
                        model: UserPosition,
                        attributes: ['position'],
                    },
                    {
                        model: UserComent,
                        attributes: ['body'],
                    },
                    {
                        model: UserField,
                        attributes: ['field'],
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
    const { id } = req.params
    try {
        const user = await User.findByPk(id, {
            include: [
                {
                    model: UserPosition,
                    attributes: ['position'],
                },
                {
                    model: UserComent,
                    attributes: ['body'],
                },
                {
                    model: UserField,
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

const postUser = async (req, res) => {
    try {
        const {name, email, password, age, zone, positions, fields} = req.body
        if (!name || !email || !password ||
            !age || !positions || !fields ||
            !zone) {
            return res.status(400).json({ message: "Missing data" })
        }

        const newUser = await User.create({
            password,
            age,
            positions,
            fields,
            name,
            email,
            zone,
        });

        const userPositions = positions.map(pos => ({ position: pos, user_id: newUser.id }));
        await UserPosition.bulkCreate(userPositions);

        const userFields = fields.map(field => ({ field: field, user_id: newUser.id }));
        await UserField.bulkCreate(userFields);

        const userResponse = await User.findByPk(newUser.id, {
            include: [
                {
                    model: UserPosition,
                    attributes: ['position'],
                },
                {
                    model: UserField,
                    attributes: ['field'],
                }
            ],
        });

        res.status(201).json(userResponse);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export default {
    getUsers,
    getUserById,
    postUser
}