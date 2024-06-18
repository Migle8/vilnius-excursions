const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    excursions: [{
        type: mongoose.Schema.ObjectId,
        ref: "Excursion",
    }],
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
