import { User, Reservation, ScheduleProperty, Property, PropertyTypeField } from "../model/index.model.js";

const isInAWeek = (dateStr) => {
    const today = new Date();
    const inputDate = new Date(dateStr);


    const todayStr = today.toISOString().split('T')[0];
    const inputStr = inputDate.toISOString().split('T')[0];

    const cleanToday = new Date(todayStr);
    const cleanInput = new Date(inputStr);

    const aWeekLater = new Date(cleanToday);
    aWeekLater.setDate(cleanToday.getDate() + 7);

    return cleanInput >= cleanToday && cleanInput <= aWeekLater;
};

export const validateNewGame = async (uid, schedule, field_type, date, property_id) => {
    let response = {
        error: false,
        status: '',
        message: '',
    };
    const user = await User.findByPk(uid);
    if (!user)
        return response = { error: true, status: 404, message: "User not found" };

    const property = await Property.findByPk(property_id)
    if (!property)
        return response = { error: true, status: 404, message: "Propiedad invalida" };


    console.log('TYPES', typeof schedule, typeof property_id);
    console.log('VALUES', schedule, property_id);
    const scheduleProperty = await ScheduleProperty.findOne({
        where: {
            id: schedule,
            id_property: property_id
        },
        logging: console.log
    });

    if (!scheduleProperty)
        return response = { error: true, status: 404, message: "Horario invalido" };

    const field = await PropertyTypeField.findOne({
        where: {
            id: field_type,
            id_property: property_id
        }
    });
    if (!field)
        return response = { error: true, status: 404, message: "Cancha Invalida " };

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
        return response = { error: true, status: 400, message: "Fecha invalida" }

    if (!isInAWeek(date))
        return response = { error: true, status: 400, message: "La fecha debe ser dentro de una semana" }


    const existingReservation = await Reservation.findOne({
        where: {
            id_schedule: scheduleProperty.id,
            id_field: field.id,
            date: date
        }
    });
    if (existingReservation)
        return response = { error: true, status: 400, message: "Cancha y horario reservado" };

    response = {
        error: false,
        status: 200,
        message: "Game is valid",
        data: {
            user: user,
            property: property,
            schedule: scheduleProperty,
            field: field
        }
    }

    return response

}