const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Product Name is required"],
            trim: true,
        }, 
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },
        stockStatus: {
            type: String,
            enum: ["in_stock", "out_of_stock", "discontinued"],
            trim: true,
        },
        unitPrice: {
            type: Number,
            required: [true, "Unit price is required"],
            default: 0
        },
        tags: {
            type: [String],
            default: []
        }
    }
)

module.exports = mongoose.model("Product", productSchema);