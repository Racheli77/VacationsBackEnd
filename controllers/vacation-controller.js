
const express = require("express");
const vacationLogic = require("../business-logic/vacation-logic");
const router = express.Router();
const path = require("path");
const uuid = require("uuid");

//------------------------------------------------------------------------------------
// GET http://localhost:3000/api/vacations
router.get("/vacations", async (request, response) => {
    console.log('BEFORE VACATIONS DATA',request.session);
    try {
        // if (!request.session.isLoggedIn) {
        //     response.json(false);
        //     return;
        // }
        const vacations = await vacationLogic.getAllVacationAsync();
        response.json(vacations);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//------------------------------------------------------------------------------------
// GET http://localhost:3000/api/vacations/3
router.get("/vacations/:vacationID", async (request, response) => {
    try {
        const vacationID = +request.params.vacationID;
        const vacation = await vacationLogic.getVacationByIDAsync(vacationID);
        response.json(vacation);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//--------------------------------------------------------------------------------------
// POST http://localhost:3000/api/add-vacations
router.post("/add-vacation", async (request, response) => {
    try {
        const picFileName = uuid.v4(); // 278364827346'
        console.log('picFileNamepicFileNamepicFileNamepicFileName', picFileName);

        const vacation = request.body;
        const file = request.files.picFileName;
        console.log(request.files, vacation);
        const extension = file.name.substr(file.name.lastIndexOf(".")); // E.g: ".jpg"
        await file.mv("./uploads/" + picFileName + extension); // E.g: "C:\my-project\uploads\204b3caf-9e37-4600-9537-9f7b4cbb181b.jpg"
        const newVacation = await vacationLogic.addVacationAsync({ ...vacation, picFileName: picFileName + extension });
        response.json({ ...newVacation, picFileName });
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/uploads/:imgName", (request, response) => {
    response.sendFile(path.join(__dirname, '../') + "\\uploads\\" + request.params.imgName);
});

//-------------------------------------------------------------------------------------------------------
// DELETE http://localhost:3000/api/delete/7
router.delete("/vacations/:vacationID", async (request, response) => {
    try {
        console.log(request);

        const vacationID = +request.params.vacationID;
        await vacationLogic.deleteVacationAsync(vacationID);
        response.sendStatus(204);
        response.json(true);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});
//------------------------------------------------------------------------------------------------------
// PUT http://localhost:3000/api/vacations/129
// router.put("/vacations/:vacationID", async (request, response) => {
//     console.log('request', request.body);
//     try {
//         const vacationID = +request.params.vacationID;
//         const vacation = request.body;
//         vacation.vacationID = vacationID;
//         const updatedVacation = await vacationLogic.updateFullVacation(vacation);

//         if (updatedVacation === null) {
//             response.sendStatus(404);
//             return;
//         }

//         response.json(updatedVacation);
//     }
//     catch (err) {
//         response.status(500).send(err.message);
//     }
// });

router.put('/vacations/:vacationID', async (request, response) => {
    try {
        console.log('request.params.vacationID', request.params.vacationID);

        const vacationID = +request.params.vacationID;
        const vacation = request.body;
        vacation.vacationID = vacationID;
        const updatedVacation = await vacationLogic.updateFullVacation(vacation);
        if (updatedVacation === null) {
            response.sendStatus(404);
            return;
        }

        response.json(updatedVacation);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
})

//------------------------------------------------------------------------------------------------------
module.exports = router;