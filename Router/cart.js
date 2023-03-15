const express = require("express")
const router = express.Router()
const verifyToken = require("../middlewares/authToken")
const controller = require("../controller/cart")

//Ruta para añadir productos al carrito
router.post("/add-to-cart",verifyToken,controller.addProductsCart)
//Ruta para ver productos dentro del carrito
router.get("/getCartItems",verifyToken,controller.getProductsCart)


module.exports = router