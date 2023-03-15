const {
  Schema,
  model
} = require("mongoose")

const cartSchema = new Schema({

  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  cartItems: [
    {
      producto: {type: Schema.Types.ObjectId, ref:'Product'},
      cantidad: {type: Number, default: 1},
      precio: {type:Number}
    }
  ]

});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
