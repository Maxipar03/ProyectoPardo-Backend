const express = require("express")
const router = express.Router()
const controller = require("../controller/users")
const verifyToken = require("../middlewares/authToken")

//Ruta para ver todos los usuarios
router.get("/",controller.index)
//ruta para crear usuario
router.post("/register",controller.userCreate)
//ruta para logear usuario
router.post("/login",controller.userLogin)
//ruta para leer info de usuario
router.get("/user",verifyToken,controller.getUserById)

module.exports = router