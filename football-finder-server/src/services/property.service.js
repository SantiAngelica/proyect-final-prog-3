import { Property, PropertyTypeField, ScheduleProperty, Reservation, Game, User } from "../model/index.model.js";
import { validateRoleAndId } from "../utils/validation.utils.js";


const getPropertys = async (req, res) => {
    try {
        const propertys = await Property.findAll({
            include: [
                {
                    model: PropertyTypeField,
                    as: 'fields',
                    attributes: ['id', 'field_type']
                },
                {
                    model: ScheduleProperty,
                    as: 'schedules',
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

const getPropertyByOwnerId = async (req, res) => {
    const { id } = req.user
    try {
        const property = await Property.findOne({
            where: {
                id_user_owner: id
            },
            include: [
                {
                    model: PropertyTypeField,
                    as: 'fields',
                },
                {
                    model: ScheduleProperty,
                    as: 'schedules'
                }
            ]
        })
        if (!property) return res.status(404).json({ message: 'Property not found' })
        console.log(property)
        return res.status(200).json(property)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const getGamesByProperty = async (req, res) => {
    const { id } = req.user
    console.log(id)
    try {
        const games = await Game.findAll({
            include: [
                {
                    model: Reservation,
                    as: 'reservation',
                    required: true,
                    include: [
                        {
                            model: PropertyTypeField,
                            as: 'fieldType'
                        },
                        {
                            model: ScheduleProperty,
                            as: 'schedule',
                            required: true,
                            include: [
                                {
                                    model: Property,
                                    as: 'property',
                                    where: {
                                        id_user_owner: id
                                    },
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    model: User,
                    as: 'userCreator'
                }
            ]
        })

        if (!games) return res.status(404).json({ message: 'No games found in this property' })

        return res.status(200).json(games)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error", error })
    }
}

const postProperty = async (req, res) => {
    const { name, adress, zone, schedule, fields_type } = req.body
    try {
        if (!name || !adress || !zone || schedule.length < 1 || fields_type.length < 1)
            return res.status(400).json({ message: "Falta Informacion" })

        const userOwner = await User.findByPk(req.user.id)
        if (!userOwner) return res.status(404).json({ message: 'User not found' })

        const existingProperty = await Property.findOne({ where: { name: name.toLowerCase() } })
        if (existingProperty) return res.status(400).json({ message: 'Nombre de la propiedad ya tomado' })

        const newProperty = await Property.create({
            id_user_owner: req.user.id,
            name: name.toLowerCase(),
            adress,
            zone
        })

        const propertySchedules = schedule.map(sch => ({ schedule: sch, id_property: newProperty.id }))
        const propertyFields = fields_type.map(fty => ({ field_type: fty, id_property: newProperty.id }))

        await ScheduleProperty.bulkCreate(propertySchedules),
            await PropertyTypeField.bulkCreate(propertyFields)
        const propertyResponse = await Property.findByPk(newProperty.id, {
            include: [
                {
                    model: ScheduleProperty,
                    as: 'schedules',
                    attributes: ['schedule'],
                },
                {
                    model: PropertyTypeField,
                    as: 'fields',
                    attributes: ['field_type'],
                }
            ],
        });
        res.status(201).json(propertyResponse)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const postAceptReservation = async (req, res) => {
    const { rid } = req.params
    try {
        const reservation = await Reservation.findByPk(rid, {
            raw: false,
            include: [
                {
                    model: ScheduleProperty,
                    as: 'schedule',
                    include: [
                        {
                            model: Property,
                            as: 'property',
                        }
                    ]
                }
            ]
        })
        if (!reservation) return res.status(404).json({ message: "Reservation not found" });
        console.log(reservation)
        if (!validateRoleAndId(req.user, reservation.schedule.property.id_user_owner,
            true, 'admin'
        )) return res.status(403).json({ message: "Unauthorized" });
        if (reservation.dataValues.state !== 'pendiente')
            return res.status(400).json({ message: "Reservation already accepted" });

        reservation.update({
            state: 'aceptada'
        })


        res.status(201).json(reservation)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const updateProerty = async (req, res) => {
    const { pid } = req.params
    try {
        const property = await Property.findByPk(pid)
        if (!property) return res.status(404).json({ message: 'Property not found' })
        if (!validateRoleAndId(req.user, property.dataValues.id_user_owner, true, 'admin'))
            return res.status(403).json({ message: 'Unauthorized' })
        const { name, adress, zone, schedule, fields_type } = req.body
        if (!name || !adress || !zone || !schedule || !fields_type)
            return res.status(400).json({ message: "Missing data" })
        await ScheduleProperty.destroy({ where: { id_property: pid } })
        await PropertyTypeField.destroy({ where: { id_property: pid } })
        await property.update({
            name: name.toLowerCase(),
            adress,
            zone
        })
        const propertySchedules = schedule.map(sch => ({ schedule: sch, id_property: pid }))
        const propertyFields = fields_type.map(fty => ({ field_type: fty, id_property: pid }))
        await ScheduleProperty.bulkCreate(propertySchedules)
        await PropertyTypeField.bulkCreate(propertyFields)
        const updatedProperty = await Property.findByPk(pid, {
            include: [
                {
                    model: ScheduleProperty,
                    as: 'schedules',
                },
                {
                    model: PropertyTypeField,
                    as: 'fields',
                }
            ],
        });
        res.status(200).json(updatedProperty)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error", error });
    }
}

const deleteProperty = async (req, res) => {
    const { pid } = req.params
    try {
        const property = await Property.findByPk(pid)
        if (!property) return res.status(404).json({ message: 'Property not found' })

        if (!validateRoleAndId(req.user, property.dataValues.id_user_owner, false, 'superadmin'))
            return res.status(403).json({ message: 'Unauthorized' })
        await PropertyTypeField.destroy({ where: { id_property: pid } })
        await ScheduleProperty.destroy({ where: { id_property: pid } })
        await Property.destroy({ where: { id: pid } })

        res.status(204).json({ message: 'Propert destroy' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

const getSchedulesByProperty = async (req, res) => {
    const pid = req.query.pid
    const date = req.query.date
    console.log(req.query)
    try {

        console.log("fecha:", date)
        if (!pid || !date) return res.status(400).json({ message: 'Missing data' })

        

        const property = await Property.findByPk(pid)
        if (!property) return res.status(404).json({ message: 'Property not found' })

        const property_fields = await PropertyTypeField.findAll({
            where: {
                id_property: Number(pid)
            }
        })
        const resevatios_date = await Reservation.findAll({
            where: {
                date: date
            },
            include: [
                {
                    model: ScheduleProperty,
                    as: 'schedule',
                    where: {
                        id_property: Number(pid)
                    },
                    attributes: []
                },
            ]
        })
        const property_schedules = await ScheduleProperty.findAll({
            where: {
                id_property: Number(pid)
            }
        })
        

        const field_schedules = property_fields.map(fld => {
            
            const fld_plain = fld.toJSON()

            const schedules_review = property_schedules.map(sch => {
                const sch_plain = sch.toJSON()
            
                //ya tengo filtrado por fecha, ahora debo verificar que horarios estan disponibles, filtrando por cancha y horario
                if(resevatios_date.some(reservation => reservation.id_field == fld.id && reservation.id_schedule == sch.id)){
                    sch_plain.available = false
                } else {
                    sch_plain.available = true
                }
                return sch_plain
            })
         
            fld_plain.schedule = schedules_review
            return fld_plain
        })

        if(!field_schedules) throw new Error('Error al buscar los horarios ')
        
        res.status(200).json(field_schedules)
    } catch (error) {
        res.status(500).json(error || {message: 'Internal server error'})
    }   
}


export default {
    getPropertys,
    getGamesByProperty,
    getPropertyByOwnerId,
    postAceptReservation,
    updateProerty,
    postProperty,
    deleteProperty,
    getSchedulesByProperty
}