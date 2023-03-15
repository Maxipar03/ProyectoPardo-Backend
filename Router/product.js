const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const shortid = require("shortid")
const controller = require("../controller/products")

//Configuracion de multer
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, path.join(__dirname,"../public/img"))
    },
    filename: (req,file,cb) => {
        cb(null, shortid.generate() + "-" + file.originalname)
    }
})

const upload = multer({storage})

//Ruta pagina principal de todos los productos
router.get("/", controller.index)
//Ruta pagina crear producto
router.post("/add", upload.single("image"), controller.createProduct)
//Ruta pagina id del producto
router.get("/:id",controller.productDetail)
//Ruta para obtener la categoria del producto
router.get("/category/:category", controller.productCategory)
//Ruta para eliminar producto
router.delete("/delete/:id",controller.productDelete)

module.exports = router