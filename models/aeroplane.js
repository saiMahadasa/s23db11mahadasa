const mongoose = require("mongoose");

const aeroplaneSchema = mongoose.Schema({
    aeroplane_type: {
        required: true,
        type: String,
    },
    color: {
        required: true,
        type: String,
    },
    number_of_wings: {
        type: Number,
        required: true,
        min: [2, 'The number of wings must be at least 2.'],
        max: [6, 'The number of wings cannot exceed 6.']
    }
});

module.exports = mongoose.model("Aeroplane", aeroplaneSchema);
