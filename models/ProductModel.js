const {
    Schema,
    model
} = require("mongoose")

const productSchema = new Schema({
    nombre: String,
    categoria: String,
    tamaño: Number,
    precio: Number,
    imgUrl: String,
})  

// Crea link para la imagen cargada //
productSchema.methods.setImgUrl = function setImgUrl (filename) {
    this.imgUrl = `${'http://localhost'}:${'3001'}/public/${filename}`
}

const Product = model("Product", productSchema)

module.exports = Product