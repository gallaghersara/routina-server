// Helper function to format a date
exports.formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

// Helper function to check if a habit is overdue
exports.isHabitOverdue = (habit) => {
    const currentDate = new Date();
    const endDate = new Date(habit.endDate);
    return currentDate > endDate;
};
