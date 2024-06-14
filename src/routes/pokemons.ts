const express = require("express");
const router = express.Router();

import getAllpokemons from "../controllers/pokemons/getAllPokemons";

router.route('/pokemons').get(getAllpokemons);

module.exports = router;