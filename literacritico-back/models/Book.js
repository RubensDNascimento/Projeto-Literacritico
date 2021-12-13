const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Book = new Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    ano: {
        type: String,
        required: Number
    },
    sinopse: {
        type: String,
        required: true
    },
    capa: {
        type: String
    },
    criticas: {
        type: Schema.Types.ObjectId,
        ref: 'review'
    },
    date:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("book", Book);