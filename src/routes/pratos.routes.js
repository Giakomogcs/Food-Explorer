const {Router} = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const PratosController = require("../controllers/PratosController")
const PratosPictureController = require("../controllers/PratosPictureController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const pratosRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const pratosController = new PratosController()
const pratosPictureController = new PratosPictureController()

pratosRoutes.use(ensureAuthenticated)

pratosRoutes.post("/", pratosController.create)
pratosRoutes.put("/:prato_id", pratosController.update)
pratosRoutes.get("/:id", pratosController.show)
pratosRoutes.get("/", pratosController.index)
pratosRoutes.delete("/:id", pratosController.delete)
pratosRoutes.patch("/picture/:id", ensureAuthenticated, upload.single("avatar"), pratosPictureController.update)

module.exports = pratosRoutes