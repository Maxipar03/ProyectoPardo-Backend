const express = require("express")
const router = express.Router()
const controller = require("../controller/users")
const verifyToken = require("../middlewares/authToken")
const authAdmin = require("../middlewares/authAdmin")

//Ruta para ver todos los usuarios
router.get("/",controller.index)
//Ruta para crear usuario
router.post("/register",controller.userCreate)
//Ruta para logear usuario
router.post("/login",controller.userLogin)
//Ruta para leer info de usuario
router.get("/user",verifyToken,controller.getUserById)

module.exports = router