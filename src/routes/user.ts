const express = require("express");
const router = express.Router();

//Controllers
import getUsers from "../controllers/user/getAllUsers";
import createUser from "../controllers/user/createUser";
import login from "../controllers/user/loginWithCredentials";

//Middlewares
import registerMiddleware from "../middlewares/registerMiddleware";

//Routes
router.route('/users').get(getUsers);
router.route('/register').post(registerMiddleware, createUser);
router.route('/login').post(login);

module.exports = router;