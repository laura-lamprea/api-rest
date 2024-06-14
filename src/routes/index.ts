const prefix = process.env.PREFIX || "/api";
const User = require("./user");

module.exports = (app: any) => {
    app.use(prefix, User)
}