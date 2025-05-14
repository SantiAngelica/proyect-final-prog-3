import {
    Property, PropertyTypeField, ScheduleProperty, Reservation,
    Game,
    User
} from "../model/index.model.js";

import { Op } from "sequelize";

const getPropertys = async (req, res) => {
    try {
        const propertys = await Property.findAll({
            include: [
                {
                    model: PropertyTypeField,
                   
                    attributes: ['id', 'field_type']
                },
                {
                    model: ScheduleProperty,
                   
                    attributes: ['id', 'schedule']
                }
            ]
        });
        if (propertys.length === 0) return res.status(404).json({ message: "No propertys found" });
        return res.status(200).json(propertys);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error });
    }
}



const getGamesByProperty = async (req, res) => {
    const { pid } = req.params
    try {
        const games = await User.findAll({
            include: [{
                model: Game,
                attributes: ['missing_players'],
                include: [{
                    model: Reservation,
                    where: {
                        state: {[Op.in]: ["pendiente", "aceptada"]}
                    },
                    attributes: ['date', 'state'],
                    include: [{
                        model: PropertyTypeField,
                        where: {
                            id_property: pid
                        }
                    },
                    {
                        model: ScheduleProperty,
                        attributes: ['schedule']
                    }]
                }]
            }],
            attributes: ['id', 'nombre', 'email']
        })

        if(!games) return res.status(404).json({message: 'No games found in this property'})

        return res.send(200).json(games)
    } catch (error) {
        res.status(500).json(error)
    }
}




export default {
    getPropertys,
    getGamesByProperty
}