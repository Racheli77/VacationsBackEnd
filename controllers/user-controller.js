
const express = require("express");
const userLogic = require("../business-logic/user-logic ");
const router = express.Router();
//------------------------------------------------------------------------------------
// GET http://localhost:3000/api/users
router.get("/users", async (request, response) => {
    try {
        const users = await userLogic.getAllUsersAsync();
        response.json(users);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//--------------------------------------------------------------------------------------------
// GET http://localhost:3000/api/user/3
router.get("/user/:userID", async (request, response) => {
    try {
        const userID = +request.params.userID;
        const user = await userLogic.getUserByIDAsync(userID);
        response.json(user);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//--------------------------------------------------------------------------------------
// POST http://localhost:3000/api/add-user
router.post("/register", async (request, response) => {
    try {
        const user = request.body;
        const addedUser = await userLogic.registerUserAsync(user);
        // request.session.isLoggedIn = true;
        console.log('AFTER REGISTER', request.session);
        response.status(201).json(addedUser);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//-----------------------------------------------------------------------------------
// DELETE http://localhost:3000/api/delete/7
router.delete("/users/:userID", async (request, response) => {
    try {
        const userID = +request.params.userID;
        await userLogic.deleteUserAsync(userID);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/login", async (request, response) => {
    console.log('login route', request.body);
    const user = await userLogic.getUser(request.body);
    console.log('useruseruseruser', user);
    if (user) {
        console.log('LOGGED IN');
    } else {
        console.log('NOT LOGGED IN');
    }
});
//-----------------------------------------------------------------------------------
module.exports = router;