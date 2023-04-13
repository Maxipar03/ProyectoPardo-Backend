let Product = require("../models/ProductModel")

const controller = {
    // Index controller
    index: (req, res) => {
        Product.find()
            .then(products => res.json(products))
            .catch(err => res.status(400).json("Error:" + err))
    },

    // Create product Controller
    createProduct: (req, res) => {
        let newProduct = new Product({
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            tamaño: req.body.tamaño,
            precio: req.body.precio
        })

        if (req.file) {
            const { filename } = req.file
            newProduct.setImgUrl(filename)
        }

        newProduct.save()
            .then(() => res.json("Producto añadido"))
            .catch(err => res.status(400).json("Error:" + err))
    },

    //Product Detail controller
    productDetail: (req, res) => {

        const id = req.params.id

        Product.findById(id)
            .then(product => {
                if (product) {
                    res.json(product)
                } else {
                    res.status(404).json("Ups! no se encontro el producto")
                }
            }
            )
            .catch(err => res.status(400).json("Error:" + err))
    },

    //Product Category controller
    productCategory: (req, res) => {

        const category = req.params.category

        Product.find({ categoria: category })
            .then(product => {
                if (product.length === 0) {
                    res.status(404).json("Ups! no se encontro un resultado")
                } else {
                    res.json(product)
                }
            })
            .catch(err => res.status(400).json("Error:" + err))
    },

    //Product Deleat controller
    productDelete: (req, res) => {

        Product.findByIdAndDelete(req.params.id)
            .then(() => res.json("Producto eliminado"))
            .catch(err => res.status(400).json("Error:" + err))
    },

    //Product search controller
    productSearch: (req, res) => {
        const searchTerm = req.params.id
        console.log("🚀 ~ file: products.js:74 ~ searchTerm:", searchTerm)
        
        if(searchTerm){
        Product.find({
            "$or": [
                { nombre: { $regex: searchTerm, $options: 'i' } },
                { categoria: { $regex: searchTerm, $options: 'i' } }
            ]
        }).then((product) => {
            res.json(product)
        })
            .catch(err => res.status(400).json("Error:" + err))
        }
    },

    //Product search controller for search page
    productSearchPage: (req,res) => {
        const searchTerm = req.params.id

        Product.find({
            "$or": [
                { nombre: { $regex: searchTerm, $options: 'i' } },
                { categoria: { $regex: searchTerm, $options: 'i' } }
            ]
        }).then((product) => {
            if (product.length === 0) {
                res.status(404).json("Ups! no se encontro un resultado")
            }else{
            res.json(product)
            }
        })
            .catch(err => res.status(400).json("Error:" + err))
    }
}

module.exports = controller