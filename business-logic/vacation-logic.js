
const dal = require("../data-access-layer/dal");

//------------------------------------------------------------------
//ge All Vacations
async function getAllVacationAsync() {
    const sql = "SELECT * FROM Vacations";
    const vacations = await dal.executeAsync(sql);
    return vacations;
}
////---
// async function getEmployeeSalariesAsync(id) {
//     const sql = `SELECT S.id, S.employeeID, S.date, S.salary, E.firstName, E.lastName
//         FROM Salaries as S JOIN Employees as E
//         ON E.id = S.employeeID
//         WHERE S.employeeID = ${id}`;
//     const salaries = await dal.executeAsync(sql);
//     return salaries;
// }
//------------------------------------------------------------------
//get Vacation By ID
async function getVacationByIDAsync(vacationID) {
    const sql = `SELECT destination, description, picFileName, startDate, endDate, price
                FROM vacations as v
                WHERE v.vacationID = ${vacationID}`;
    const vacation = await dal.executeAsync(sql);
    return vacation[0];
}
//--------------------------------------------------------------------------
// add Vacation
async function addVacationAsync(vacation) {
    console.log('vacation addVacationAsync', vacation);

    const sql = `INSERT INTO vacations (description, destination, picFileName, startDate, endDate, price)
                VALUES (
                    '${vacation.description}',
                    '${vacation.destination}',
                    '${vacation.picFileName}',
                    '${vacation.startDate}',
                    '${vacation.endDate}',
                    ${vacation.price})`;
    const info = await dal.executeAsync(sql);
    vacation.vacationID = info.insertId;

    return vacation;
}
//----------------------------------------------------------------------------
//delete Vacation
async function deleteVacationAsync(vacationID) {
    const sql = `DELETE FROM Vacations WHERE vacationID = ${vacationID}`;
    await dal.executeAsync(sql);
}

//----------------------------------------------------------------------------
//update Full Vacation
async function updateFullVacation(vacation) {
    const sql = `
        UPDATE Vacations SET 
            description = '${vacation.description}',
            destination = '${vacation.destination}',
            picFileName = '${vacation.picFileName}',
            startDate = '${vacation.startDate}',
            endDate = '${vacation.endDate}',
            price = ${vacation.price}
        WHERE vacationID = ${vacation.vacationID}`;
    const info = await dal.executeAsync(sql);
    return info.affectedRows === 0 ? null : vacation;
}
//------------------------------------------------------------------------------
module.exports = {
    getAllVacationAsync,
    getVacationByIDAsync,
    addVacationAsync,
    deleteVacationAsync,
    updateFullVacation
}