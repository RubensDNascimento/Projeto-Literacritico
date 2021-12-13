const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    eCritico:{
        type: Number,
        default: 0
    },
    senha:{
        type: String,
        required: true
    },
    criticas:[{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }]
})

mongoose.model("users", User);