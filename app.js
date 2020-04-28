
const express = require("express");
const cors = require("cors");
const vacationController = require("./controllers/vacation-controller");
const userController = require("./controllers/user-controller");
const server = express();
//====
const fs = require("fs");
const uuid = require("uuid");
const fileUpload = require("express-fileupload");
//====
const expressSession = require("express-session");
//---------------------------------------------------------------------------------------

if (!fs.existsSync(__dirname + "\\uploads")) { // Create "//uploads" folder if not exist.
    fs.mkdirSync(__dirname + "\\uploads");
}

//---------------------------------------------------------------------------------------
// if (!fs.existsSync('../server/controllers/uploads')) {
//     fs.mkdirSync('../server/controllers/uploads');
// }
//-------------------------------------------------------------------------------------

// Need those exact configuration for the session cookie to be saved at client side.

server.use(express.json());
server.use(fileUpload());
server.use(expressSession({ name: "TestLoginCookie", secret: "KittensAreCute", resave: true, saveUninitialized: false }));

//-------------------------------------------------------------------------------
// server.use(cors()); // Cross Origin Resource Sharing
server.use(cors({ origin: "http://localhost:3001", credentials: true })); 
server.use(express.json());//Get the JSON in the request body and create an object from it (request.body)
server.use("/api", vacationController);
server.use("/api", userController);

//------------------------------------------------------------------------------------

server.listen(3000, () => console.log("Listening on http://localhost:3000"));

