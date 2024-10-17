const mongoose = require("mongoose");

/////////////////////////////////////////////////////////////////
const SaleItemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: [true, "Please provide item name!"],
            minLength: [2, "Item name must be at least 2 characters!"],
        },
        price: {
            type: Number,
            required: [true, "Please provide price!"],
            min: [0, "Price must be nonnegative number!"],
        },
        status: {
            type: String,
            enum: ["sold-out", "available", "pending"],
            default: "available",
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            require: [true, "Please provide user"],
        },
        negotiable: {
            type: Boolean,
            default: false,
        },
        quantity: {
            type: Number,
            required: [true, "Please provide number of selling item!"],
            min: [0, "Quantity must be nonnegative number!"],
        },
    },
    { timestamps: true }
);

/////////////////////////////////////////////////////////////////
module.exports = mongoose.model("Item", SaleItemSchema);
