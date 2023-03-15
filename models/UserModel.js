const {
    Schema,
    model
} = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    contraseña: String,
})

// Metodo el cual hashea la contraseña //
userSchema.methods.cryptPasword = function cryptPasword(password){
this.contraseña =  bcrypt.hashSync(password, 10)
}
// Metodo el cual compara contraseña //
userSchema.methods.matchPasword = function matchPasword(contraseña){
    return bcrypt.compare(contraseña,this.contraseña)
}

const User = model("User", userSchema)

module.exports = User