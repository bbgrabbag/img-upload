const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imgUrl: String,
    credit: String,
    caption: String
});

module.exports = mongoose.model("Image", ImageSchema);