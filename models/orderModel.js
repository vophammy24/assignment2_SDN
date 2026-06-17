const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true,
        },
        productName: {
            type: String, 
            required: [true, "Product name is required"],
            trim: true,
        },
        quantity: {
            type: Number,
            require: [true, "Quantity is required"],
            default: 1,
        },
        orderDate: {
            type: Date,
            require: [true, "Order date is required"]
        },
        totalPrice: {
            type: Number,
            required: [true, "Total price is required"],
            default: 0
        }
    }
)

module.exports = mongoose.model("Order", orderSchema);