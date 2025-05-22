import {User, Reservation, ScheduleProperty, Property, PropertyTypeField } from "../model/index.model.js";

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

export const validateNewGame = async (uid, schedule, field_type, date, property_name) => {
    let response = {
        error: false,
        status: '',
        message: '',
    };
    const user = await User.findByPk(uid);
    if (!user)
        return response = { error: true, status: 404, message: "User not found" };
        
    const property = await Property.findOne({where: {name: property_name.toLowerCase()}})
    if(!property)
        return response = { error: true, status: 404, message: "Property not found" };

    const scheduleProperty = await ScheduleProperty.findOne({
        where: {
            schedule: schedule,
            id_property: property.id
        }
    });
    if(!scheduleProperty)
        return response = { error: true, status: 404, message: "Schedule not in property" };

    const field = await PropertyTypeField.findOne({
        where: {
            field_type: field_type,
            id_property: property.id
        }
    });
    if(!field)
        return response = { error: true, status: 404, message: "Field not in property" };

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
       return  response = { error: true, status: 400, message: "Invalid date format" }

    if (!isInAWeek(date))
        return response = { error: true, status: 400, message: "Date is not in a week" }


    const existingReservation = await Reservation.findOne({
        where: {
            id_schedule: scheduleProperty.id,
            id_field: field.id,
            date: date
        }
    });
    if (existingReservation) 
      return  response = { error: true, status: 400, message: "Field is already reserved" };

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