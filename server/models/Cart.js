const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        title: { type: String,  unique: true },
       desc: { type: String }, 
       img: { type: String, unique: true },
        categories: { type: Array },
       size: { type: Array },
       color: { type: Array },
       price: { type: Number },
       inStock: { type: Boolean },
       reviews: { type: Array },
       likes: { type: Number },
        quantity: {
          type: Number,   
          
        }
      },
    ],
    total: { type: Number },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
