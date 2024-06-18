const mongoose = require("mongoose");

const excursionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    image: [String],
    // image: {
    //     type: String,
    //     required: [true, "Description is required"],
    // },
    duration: {
        type: Number,
        required: [true, "Excursion duration is required"],
    },
    date: [String],
    // date: [
    //     {
    //       type: String,
    //     },
    //   ],
    // date: {
    //     type: String,
    //     required: [true, "Date is required"],
    // },
    time: {
        type: String,
        required: [true, "Time is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    // rating: {
    //     type: Number,
    //     default: 0,
    //     // min: [1, "Rating must be above 1.0"],
    //     // max: [5, "Rating must be below 5.0"],
    // },
    // reatingQuantity: {
    //     type: Number,
    //     default: 0,
    // },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
    },
});

const Excursion = mongoose.model("Excursion", excursionSchema);
module.exports = Excursion;
