let Cart = require("../models/CartModel")

const controller = {
    
    addProductsCart: (req, res) => {

        Cart.findOne({
            usuario: req.user.id
        })
            .exec((error, cart) => {

                /* En caso de que ya tenga carrito el usuario */
                if (error) return res.status(400).json({ error })
                if (cart) {

                    const isItemAdded = cart.cartItems.find(c => c.producto == req.body.cartItems.producto)

                    /* En caso de que el producto selecionado ya se encuentre dentro del carrito */
                    if (isItemAdded) {
                        Cart.findOneAndUpdate({
                            "usuario": req.user.id,
                            "cartItems.producto": req.body.cartItems.producto
                        }, {
                            "$set": {
                                "cartItems": {
                                    ...req.body.cartItems,
                                    cantidad: isItemAdded.cantidad + req.body.cartItems.cantidad
                                }
                            }
                        })
                            .exec((error, cart_) => {
                                if (error) return res.status(400).json({ error })
                                if (cart_) return res.json({ cart_: cart })
                            })

                    } else {
                        Cart.findOneAndUpdate({
                            usuario: req.user.id
                        }, {
                            "$push": {
                                "cartItems": req.body.cartItems
                            }
                        })
                            .exec((error, cart_) => {
                                if (error) return res.status(400).json({ error })
                                if (cart_) return res.json({ cart_: cart })
                            })

                    }
                    /* En caso de que el usuario no tenga carrito */
                } else {
                    const cart = new Cart({
                        usuario: req.user.id,
                        cartItems: [req.body.cartItems]
                    })

                    cart.save((error, cart) => {
                        if (error) return res.status(400).json({
                            error
                        })
                        if (cart) {
                            return res.json({ cart })
                        }
                    })
                }
            })


    },

    getProductsCart: (req,res) => {
        
        Cart.findOne({ user: req.user._id })
        .populate("cartItems.producto")
        .exec((error,cart) => {
          if (error) return res.status(400).json({
            error
        })
        if(cart){
                res.status(200).json({cart});
        }   
        })
    }
}

module.exports = controller