const express = require('express');
const router = express.Router();
const { eCritico, estaLogado } = require("../helpers/accessControl")
const mongoose = require('mongoose');
require("../models/Book");
require("../models/Reviews");
require("../models/Users");
const Book = mongoose.model("book");
const User = mongoose.model("users");
const Review = mongoose.model("review");
var fs = require('fs');
var path = require('path');
var pathCapa;



var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + file.originalname)
    }
});

var upload = multer({ storage: storage });



router.get('/livros', async (req, res) => {
    Book.find().sort({ date: 'desc' }).then((books) => {
        res.send({
            livros: { books }
        })
    })
})

router.get("/editarLivro/:id", estaLogado,async (req, res) => {
    Book.findOne({ _id: req.params.id }).then((book) => {
        res.send({ livro: { book } });
        console.log(book)
    }).catch((err) => {
        req.flash("error_msg", "Livro não encontrado")
        res.status(401).json({ success: false, msg: "Livro não encontrado" });
        console.log("Livro não encontrado")
    })
})

router.post('/novoLivro', estaLogado, eCritico ,upload.single('capa'), async (req, res, next) => {
    var erros = []
    console.log(req.body);
    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ texto: "Titulo inválido" })
    }
    if (!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null) {
        erros.push({ texto: "Autor inválido" })
    }
    if (!req.body.ano || typeof req.body.ano == undefined || req.body.ano == null) {
        erros.push({ texto: "Ano inválido" })
    }
    if (req.body.ano > 2021) {
        erros.push({ texto: "Não pode cadastrar um livro ainda não lançado" })
    }
    if (!req.body.sinopse || typeof req.body.sinopse == undefined || req.body.sinopse == null) {
        erros.push({ texto: "sinopse inválida" })
    }
    console.log(erros)
    console.log(req.body)

    if (erros.length > 0) {
        res.status(400).json({ success: false, msg: erros });
    } else {
        Book.findOne({ titulo: req.body.titulo }).then((book) => {
            if (book) {
                erros.push({ texto: "Já existe um livro com o mesmo título" })
                console.log("Já existe um livro com o mesmo título")
                res.status(409).json({ success: false, msg: erros });
            } else {
                if (!req.file) {
                    pathCapa = "/uploads/1638455645695SanctumImoveis2.png"
                } else {
                    pathCapa = req.file.path.replace(/\\/g, "/").substring("public".length);
                }

                const newBook = new Book({
                    titulo: req.body.titulo,
                    autor: req.body.autor,
                    ano: req.body.ano,
                    sinopse: req.body.sinopse,
                    capa: pathCapa
                })

                newBook.save().then(() => {
                    erros.push({ texto: "Já existe um livro com o mesmo título" });
                    res.status(200).json({ success: true, msg: "Livro criado com sucesso!" });
                }).catch((err) => {
                    erros.push({ texto: "Não foi possivel criar o Livro" });
                    console.log("Não foi possivel criar o Livro" + err)
                    res.status(500).json({ success: false, msg: erros });
                })
            }
        }).catch((err) => {
            erros.push({ texto: "Houve um erro interno" });
            console.log("Houve um erro interno: " + err)
            res.status(400).json({ success: false, msg: erros });
        })
    }
})


router.put("/editarLivro", estaLogado,eCritico, upload.single('capa'), async (req, res) => {
    var erros = []
    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ texto: "Titulo inválido" })
    }
    if (!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null) {
        erros.push({ texto: "Autor inválido" })
    }
    if (!req.body.ano || typeof req.body.ano == undefined || req.body.ano == null) {
        erros.push({ texto: "Ano inválido" })
    }
    if (req.body.ano > 2021) {
        erros.push({ texto: "Não pode cadastrar um livro ainda não lançado" })
    }
    if (!req.body.sinopse || typeof req.body.sinopse == undefined || req.body.sinopse == null) {
        erros.push({ texto: "sinopse inválida" })
    }
    console.log(erros)
    console.log(req.body)


    if (erros.length > 0) {
        res.status(400).json({ success: false, msg: erros });
    } else {
        Book.findOne({ titulo: req.body.titulo }).then((book) => {
            if (book && book._id != req.body.id) {
                erros.push({ texto: "Já existe um livro com o mesmo título" })
                console.log("Já existe um livro com o mesmo título")
                res.status(409).json({ success: false, msg: erros })
            }
            else {
                Book.findOne({ _id: req.body.id }).then((book) => {
                    console.log("Livro Atual" + book)
                    console.log("Id Atual" + book._id)
                    console.log("Id Novo" + req.body.id)
                    console.log("Titulo Atual: " + book.titulo)
                    console.log("Titulo Novo: " + req.body.titulo)
                    console.log("Capa Atual: " + book.capa)

                    if (!req.file) {
                        pathCapa = book.capa
                    } else {
                        pathCapa = req.file.path.replace(/\\/g, "/").substring("public".length);
                    }

                    book.titulo = req.body.titulo;
                    console.log("Titulo:" + book.titulo)
                    console.log("Titulo:" + req.body.titulo)
                    book.autor = req.body.autor;
                    book.ano = req.body.ano;
                    book.sinopse = req.body.sinopse;
                    book.capa = pathCapa;


                    console.log("Livro Novo" + book)

                    book.save().then(() => {
                        res.status(200).json({ success: true, msg: "Livro editado com sucesso!" });
                        console.log("Livro editado com sucesso!")
                    }).catch((err) => {
                        erros.push({ texto: "Houve um erro ao salvar a edição" })
                        res.status(400).json({ success: false, msg: erros });
                        res.redirect("/admin/livros")
                    })
                }).catch((err) => {
                    erros.push({ texto: "Houve um erro interno" });
                    console.log("Houve um erro interno: " + err)
                    res.status(400).json({ success: false, msg: erros });
                })
            }


        }).catch((err) => {
            erros.push({ texto: "Livro não encontrado" })
            res.status(400).json({ success: false, msg: erros });
        })
    }
})



router.delete("/deleteBook", estaLogado, eCritico,  async (req, res) => {

    console.log(req.body.id)
    Book.findOne({ _id: req.body.id }).then((book)=>{
        console.log(book.criticas.length);
        if (book.criticas.length >= 1) {
            res.status(500).json({ success: false, msg: "Você não pode remover este livro pois existem criticas ligadas a ele", criticas: book.critica });
            console.log("Você não pode remover este livro pois existem criticas ligadas a ele")
        }else{
            Book.deleteOne({ _id: req.body.id }).then(() => {
                res.status(200).json({ success: true, msg: "Deletado com Sucesso" });
                console.log("Deletado")
            }).catch(() => {
                res.status(500).json({ success: false, msg: "Houve um erro ao deletar o livro" });
                console.log("Houve um erro ao deletar o livro: ")
            })
        }
    })
})

router.get("/editarCritica/:id", estaLogado, eCritico,  async (req, res) => {
    Review.findOne({ _id: req.params.id }).then((review) => {
        res.send({ critica: { review } });
        console.log(review)
    }).catch((err) => {
        req.flash("error_msg", "Critica não encontrada")
        res.status(401).json({ success: false, msg: "Critica não encontrada" });
        console.log("Critica não encontrada")
    })
})
router.get("/getLivros", async (req, res) => {
    Book.find().then((books) => {
        //res.render("critica/newReview", { books: books })
        res.send({ livros: { books } })
    }).catch((err) => {
        res.status(400).json({ success: false, msg: "Houve um erro ao carregar a formulario" });
        console.log(err)
    })
})
router.post("/novaCritica", estaLogado, eCritico,  async (req, res) => {
    var erros = []
    console.log(req.body)
    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ texto: "Titulo inválido" })
    }
    if (req.body.critico == "0") {
        erros.push({ texto: "Usuario não é um crítico" })
    }
    if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
        erros.push({ texto: "Conteúdo inválido" })
    }
    if (!req.body.resumo || typeof req.body.resumo == undefined || req.body.resumo == null) {
        erros.push({ texto: "Resumo inválida" })
    }
    if (req.body.livro == "0" || !req.body.livro || typeof req.body.livro == undefined || req.body.livro == null) {
        erros.push({ texto: "Livro invalido" })
    }
    console.log(erros)


    if (erros.length > 0) {
        res.status(400).json({ success: false, msg: erros });
    } else {
        const newReview = new Review({
            titulo: req.body.titulo,
            critico: req.body.critico,
            conteudo: req.body.conteudo,
            resumo: req.body.resumo,
            livro: req.body.livro
        })
        console.log(newReview)

        

        newReview.save().then(() => {
            Book.findOneAndUpdate(
                {_id: newReview.livro},
                {$push:{criticas: newReview.id}},
                function(err, success){
                if (err) {
                erros.push({ texto: "Este livro não existe" })
                res.status(400).json({ success: false, msg: erros });
                }
            })
            User.findOneAndUpdate(
                {_id: newReview.critico},
                {$push:{criticas: newReview.id}},
                function(err, success){
                if (err) {
                erros.push({ texto: "Este usuario não existe" })
                console.log( "Este usuario não existe");
                res.status(400).json({ success: false, msg: erros });
                }
            })
            
            res.status(200).json({ success: true, msg: "Crítica criado com sucesso!" });
            console.log("Crítica criado com sucesso!")
            console.log(newReview)
        }).catch((err) => {
            erros.push({ texto: "Não foi possivel criar a Crítica" });
            res.status(400).json({ success: false, msg: erros });
            console.log("Não foi possivel criar a Crítica" + err)
        })
    }
})

router.put("/editarCritica", estaLogado, eCritico,  async (req, res) => {
    var erros = []
    console.log(req.body)
    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ texto: "Titulo inválido" })
    }
    if (req.body.critico == "0") {
        erros.push({ texto: "Usuario não é um crítico" })
    }
    if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
        erros.push({ texto: "Conteúdo inválido" })
    }
    if (!req.body.resumo || typeof req.body.resumo == undefined || req.body.resumo == null) {
        erros.push({ texto: "Resumo inválida" })
    }
    if (req.body.livro == "0") {
        erros.push({ texto: "Este livro não existe" })
    }
    console.log(erros)



    if (erros.length > 0) {
        res.status(400).json({ success: false, msg: erros });
    } else {
        Review.findOne({ _id: req.body.id }).then((review) => {

            review.titulo = req.body.titulo;
            console.log("Titulo:" + review.titulo)
            console.log("Titulo:" + req.body.titulo)
            review.conteudo = req.body.conteudo;
            review.resumo = req.body.resumo;
            review.livro = req.body.livro;
            review.critico = req.body.critico;


            console.log("Critica Nova" + review)

            review.save().then(() => {
                res.status(200).json({ success: true, msg: "Critica editada com sucesso!" });
                console.log("Critica editada com sucesso!")
            }).catch((err) => {
                erros.push({ texto: "Houve um erro ao salvar a edição" })
                res.status(400).json({ success: false, msg: erros });
                res.redirect("/admin/livros")
            })



        }).catch((err) => {
            erros.push({ texto: "Critica não encontrada" })
            console.log(err)
            res.status(400).json({ success: false, msg: erros });
        })
    }
})
router.get('/criticas', async (req, res) => {
    Review.find().sort({ date: 'desc' }).then((reviews) => {
        res.send({
            criticas: { reviews }
        })
    })
})
router.post('/getCritico', async (req, res) => {
    console.log(req.body)
    User.findOne({ _id: req.body.id }).then((user) => {
        res.send(user)
    }).catch(err => {
        console.log("Erro: " + err)
    })
})
router.get('/getCritica/:id', async (req, res) => {
    console.log(req.body)
    Review.findOne({ _id: req.params.id }).then((review) => {
        res.send({ critica: { review } })
    }).catch(err => {
        console.log("Erro: " + err)
    })
})
router.post('/getLivro', async (req, res) => {
    console.log(req.body)
    Book.findOne({ _id: req.body.id }).then((book) => {
        res.send(book)
    }).catch(err => {
        console.log("Erro: " + err)
        erros.push({ texto: "Houve um erro interno" })
        res.status(400).json({ success: false, msg: "Houve um erro interno" });
    })
})
router.delete("/deleteCritica", estaLogado, eCritico,  async (req, res) => {

    console.log(req.body.id)
    Review.findOne({ _id: req.body.id }).then((review) => {
        console.log("----------------");
        console.log(review);
        Book.findOneAndUpdate(
            {_id: review.livro},
            {$pull:{criticas: review.id}},
            function(err, success){
            if (err) {
                console.log("Houve um erro ao remover critica do livro");
                res.status(400).json({ success: false, msg: "Houve um erro ao remover critica do livro" });
            }
        })
        User.findOneAndUpdate(
            {_id: review.critico},
            {$pull:{criticas: review.id}},
            function(err, success){
            if (err) {
            console.log( "Houve um erro ao remover critica do livro");
            res.status(400).json({ success: false, msg: "Houve um erro ao remover critica do livro" });
            }
        })
        Review.deleteOne(review).then(() => {
            res.status(200).json({ success: true, msg: "Deletado com Sucesso" });
        })
        
        console.log("Deletado")
    }).catch((err) => {
        res.status(400).json({ success: false, msg: "Houve um erro ao deletar a Critica" });
        console.log("Houve um erro ao deletar a edição: " + err)
    })
})

router.get('/getCriticaPorLivro/:id', async (req, res) => {
    console.log(req.params.id);
    Review.find({livro: req.params.id}).populate('livros').exec((err, reviews)=>{
        if (err) {
            res.status(400).json({ success: false, msg: "Houve um erro ao encontrar as criticas" });
            console.log("Houve um erro ao encontrar as criticas: " + err)
        }else{
            res.status(200).json({success:true, criticas: reviews, msg: "Criticas encontradas com sucesso!"})
        }
    })

})


module.exports = router; 