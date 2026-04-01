const mongoose = require("mongoose");

// This defines what a "Product" looks like in the database
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // name is compulsory
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        required: true,  // price is compulsory
        min: 0
    },
    category: {
        type: String,
        default: "General"
    },
    image: {
        type: String,
        default: "default-product.png"
    }
}, { timestamps: true }); // automatically adds createdAt and updatedAt

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
