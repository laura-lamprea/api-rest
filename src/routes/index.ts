const prefix = process.env.PREFIX || "/api";
const User = require("./user");
const Favorites = require("./favorites");
const Pokemon = require("./pokemons");

module.exports = (app: any) => {
    app.use(prefix, User)
    app.use(prefix, Favorites)
    app.use(prefix, Pokemon)
}