let User = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const controller = {
    //Ver usuarios
    index: (req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.status(400).json("Error:" + err))
    },
    //Create User
    userCreate: (req, res) => {
        let newUser = new User({
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
        })

        if (req.body.contraseña) {
            newUser.cryptPasword(req.body.contraseña)
        }
        newUser.save()
            .then(() => res.json("usuario añadido"))
            .catch(err => res.status(400).json("Error:" + err))

        /*const token = jwt.sign({id: newUser._id},"Super sectret key",{
             expiresIn:86400
         })
 
         res.json({token})*/
    },
    //Login User
    userLogin: (req, res) => {
        const { email, contraseña } = req.body
        User.findOne({ email }).then((user) => {
            if (!user) {
                res.status(401).json("El usuario iniciado no es correcto")
            } else {
                bcrypt.compare(contraseña, user.contraseña).then((esCorrecta) => {
                    if (esCorrecta) {
                    const token = jwt.sign({ id: user._id }, "The super secret key", { expiresIn: 3600 })
                    res.json({token})
                    } else {
                        res.status(401).json("La contraseña ingresada es incorrecta")
                    }
                })
            }

        })

    },
    getUserById: (req,res) => {
        const {id} = req.user
        
        if(id.length === 24){
            User.findById(id).then((usuario) => {
                if(!usuario){
                    return res.json({ mensaje: "No se encontro ningun usuario con esa ID"})
                } else {
                    const {_id,contraseña, ...resto} = usuario._doc
                    res.json(resto)
                }
            })
        }
    }
}

module.exports = controller