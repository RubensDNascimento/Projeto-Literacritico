const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Review = new Schema({
    titulo: {
        type: String,
        required: true
    },
    critico: {
        type: Schema.Types.ObjectId,
        ref: 'critico',
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    resumo: {
        type: String
    },
    livro:{
        type: Schema.Types.ObjectId,
        ref: 'book',
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
})
Review.virtual('livros',{
    ref:'book',
    localField:'_id',
    foreignField: 'criticas'
})


mongoose.model("review", Review);