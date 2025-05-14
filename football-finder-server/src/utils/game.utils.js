import {User, Reservation, ScheduleProperty } from "../model/index.model.js";

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

export const validateNewGame = async (uid, scheduleid, field_type_id, date) => {
    let response = {
        error: false,
        status: '',
        message: '',
    };
    const user = await User.findByPk(uid);
    if (!user)
        return response = { error: true, status: 404, message: "User not found" };
        
    console.log(date)
    const schedule = await ScheduleProperty.findByPk(scheduleid);
    if (!schedule)
        return response = { error: true, status: 404, message: "Schedule not found" };

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
       return  response = { error: true, status: 400, message: "Invalid date format" }

    if (!isInAWeek(date))
        return response = { error: true, status: 400, message: "Date is not in a week" }


    const existingReservation = await Reservation.findOne({
        where: {
            id_schedule: scheduleid,
            id_field: field_type_id,
            date: date
        }
    });
    if (existingReservation) 
      return  response = { error: true, status: 400, message: "Field is already reserved" };


    return response

}