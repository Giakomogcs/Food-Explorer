const {Router} = require("express")
const usersRouter = require("./users.routes")
const pratosRouter = require("./pratos.routes")
const ingredientsRoutes = require("./ingredients.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router()
routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRoutes)
routes.use("/pratos", pratosRouter)
routes.use("/ingredients", ingredientsRoutes)

module.exports = routes