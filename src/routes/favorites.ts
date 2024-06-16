const express = require("express");
const router = express.Router();

//Controllers
import addFavorite from "../controllers/favorite/addFavorites";
import getFavorites from "../controllers/favorite/getFavorites";
import removeFavorite from "../controllers/favorite/removeFavorite";
import getUser from "../controllers/user/getUser";


//Middlewares
import addFavoriteMiddleware from "../middlewares/addFavoriteMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

//Routes
router.route('/users/favorites')
    .post(authMiddleware, addFavoriteMiddleware, addFavorite);
router.route('/users/favorites/:id').get(authMiddleware, getFavorites);
router.route('/users/favorites/remove').post(authMiddleware, removeFavorite);
router.route('/user').get(authMiddleware, getUser);



module.exports = router;