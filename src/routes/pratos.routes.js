const {Router} = require("express")

const PratosController = require("../controllers/PratosController")

const pratosRoutes = Router()

const pratosController = new PratosController()

pratosRoutes.post("/:user_id", pratosController.create)

module.exports = pratosRoutes