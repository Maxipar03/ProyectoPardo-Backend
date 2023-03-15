const dotenv = require("dotenv")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./Router/user")
const productUser = require("./Router/product")
const cartRouter = require("./Router/cart")
const session = require("express-session")

dotenv.config()
const app = express()

app.use("/public", express.static(`${__dirname}/public/img`))
app.use(express.json())
app.use(cors())
app.use(session({
    secret: "Shh, its a secret",
    resave: false,
    saveUninitialized: false,
}))

// Conectando base de datos //
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database conectada")
}).catch(err => {
    console.log(err)
})

app.get("/",(req,res) => {
 res.send("El api esta funcionando correctamente")
})

app.use("/users",userRouter)
app.use("/products",productUser)
app.use("/cart",cartRouter)


const PORT = process.env.PORT
app.listen(PORT,() => {
    console.log(`El servidor se esta corriendo en el puerto ${PORT}`)
})