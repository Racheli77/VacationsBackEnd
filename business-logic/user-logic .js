

const dal = require("../data-access-layer/dal");

//------------------------------------------------------------------
//get All Users  
async function getAllUsersAsync() {
    const sql = "SELECT * FROM users";
    const users = await dal.executeAsync(sql);
    return users;
}
//----------------------------------------------------------------------------
//get User By ID 
async function getUserByIDAsync(userID) {
    const sql = `SELECT firstName, lastName, userName, password, isAdmin
                FROM users as u
                WHERE u.userID = ${userID}`;
    const user = await dal.executeAsync(sql);
    return user;
}
//----------------------------------------------------------------------------
//register UserAsync
async function registerUserAsync(user) {
    console.log(user);

    const sql = `INSERT INTO users (firstName, lastName, userName, password)
                VALUES (
                    '${user.firstName}',
                    '${user.lastName}',
                    '${user.userName}',
                    '${user.password}'
                   )`;

    const info = await dal.executeAsync(sql);
    user.userID = info.insertId;
    return user;
}
//----------------------------------------------------------------------------
//delete User
async function deleteUserAsync(userID) {
    const sql = `DELETE FROM Users WHERE userID = ${userID}`;
    await dal.executeAsync(sql);
}
//---------------------------------------------------------------------------------------------
//=============================================================================================

async function getUser(credentials) {
    console.log(credentials);
    
    const sql = `SELECT firstName,firstName, lastName, userName
    FROM users as u
    WHERE u.userName = ${credentials.username} AND u.password = ${credentials.password}`;
    const user = await dal.executeAsync(sql);
    return user[0];

    // const sql = ``
    // if (credentials.userName === userName && credentials.password === "1234") {
    //     const user = {
    //         firstName: "Moishe",
    //         lastName: "Ufnik",
    //         username: "Moshiko",
    //         role: "user"
    //     };
    //     return user;
    // }
    // else if (credentials.username === "Kipodi" && credentials.password === "abcd") {
    //     const user = {
    //         firstName: "Kipi",
    //         lastName: "Ben-Kipod",
    //         username: "Kipodi",
    //         role: "admin"
    //     };
    //     return user;
    // }
    // return null;
}


module.exports = {
    getAllUsersAsync,
    getUserByIDAsync,
    registerUserAsync,
    deleteUserAsync,
    getUser
}