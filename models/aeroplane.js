const mongoose = require("mongoose")
const aeroplaneSchema = mongoose.Schema({
    aeroplane_type: String,
    color: String,
    number_of_wings: Number
})
module.exports = mongoose.model("Aeroplane",
aeroplaneSchema)