export const isInAWeek = (dateStr) => {
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