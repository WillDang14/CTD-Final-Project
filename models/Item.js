const mongoose = require("mongoose");

/////////////////////////////////////////////////////////////////
const SaleItemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: [true, "Please provide item name"],
            minLength: 1,
        },
        price: {
            type: Number,
            required: [true, "Please provide price tag"],
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
    },
    { timestamps: true }
);

/////////////////////////////////////////////////////////////////
module.exports = mongoose.model("Item", SaleItemSchema);
