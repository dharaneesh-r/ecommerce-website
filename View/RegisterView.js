const express = require('express');
const app = express();
const cors = require('cors');

//MIDDLEWARES

app.use(cors());
app.use(express.json());

//ROUTES

const registerRouter = express.Router()

//ROUTES IMPORT FILE

const { getRegister, postRegister, Login } = require("../Controllers/RegisterController");

registerRouter.get("/register", getRegister);
registerRouter.post("/register", postRegister);
registerRouter.post("/login", Login);


module.exports =  registerRouter;
