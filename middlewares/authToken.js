const jwt = require("jsonwebtoken")

const verifyToken = async (req,res,next) => {
    const token = req.headers["token"]

    if(token){
        jwt.verify(token,"The super secret key", (error,data) => {
            if (error) return res.status(400).json({ mensaje: "Token Invalid"})
            else {
                req.user = data
                next()
            }
        })
    } else {
        res.status(400).json({mensaje: "Debes enviar un token"})
    }
}

module.exports = verifyToken