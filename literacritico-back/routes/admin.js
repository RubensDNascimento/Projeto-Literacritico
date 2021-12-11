const express = require('express');
const router = express.Router();
const {eCritico, estaLogado} = require("../helpers/accessControl")
const mongoose = require('mongoose');
require("../models/Book");
require("../models/Reviews");
const Book = mongoose.model("book");
const Review = mongoose.model("review");
var fs = require('fs');
var path = require('path');
var pathCapa ;



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


router.get('/', eCritico,  async(req, res)=>{
    res.render("admin/index")
})
router.get('/livros',  async(req, res)=>{
    Book.find().sort({date:'desc'}).then((books)=>{
    res.send({
        livros: {books}
    })
    })
})
router.get('/novoLivro', eCritico, async(req, res)=>{
    res.render("admin/newBook")
})
router.get("/editarLivro/:id", async(req, res)=>{
    Book.findOne({_id:req.params.id}).then((book)=>{
    res.render("admin/editBook", {book:book});
    }).catch((err)=>{
        req.flash("error_msg", "Livro não encontrado")
        res.redirect("/admin/livros")
    })
})

router.post('/novoLivro', upload.single('capa'), async(req, res, next) => {
    var erros =[]
    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({texto: "Titulo inválido"})
        req.flash("error_msg", "Titulo inválido");
    }
    if(!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null){
        erros.push({texto: "Autor inválido"})
        req.flash("error_msg", "Autor inválido");
    }
    if(!req.body.ano || typeof req.body.ano == undefined || req.body.ano == null){
        erros.push({texto: "Ano inválido"})
        req.flash("error_msg", "Ano inválido");
    }
    if(req.body.ano > 2021){
        erros.push({texto: "Não pode cadastrar um livro ainda não lançado"})
        req.flash("error_msg", "Não pode cadastrar um livro ainda não lançado");
    }
    if(!req.body.sinopse || typeof req.body.sinopse == undefined || req.body.sinopse == null){
        erros.push({texto: "sinopse inválida"})
        req.flash("error_msg", "sinopse inválida");
    }
    console.log(erros)
    console.log(req.body)

    if(erros.length > 0){
        res.redirect("/admin/novoLivro")
    }else{
        Book.findOne({titulo: req.body.titulo}).then((book) => {
            if(book){
                req.flash("error_msg", "Já existe um livro com o mesmo título");
                console.log("Já existe um livro com o mesmo título")
                res.redirect("/admin/novoLivro")
            }else{
                if(!req.file){
                    pathCapa = "/uploads/1638455645695SanctumImoveis2.png"
                }else{
                    pathCapa = req.file.path.replace(/\\/g, "/").substring("public".length);
                }
                
                const newBook = new Book({
                    titulo: req.body.titulo,
                    autor: req.body.autor,
                    ano: req.body.ano,
                    sinopse: req.body.sinopse,
                    capa: pathCapa
                })
                
                newBook.save().then(()=>{
                    req.flash("success_msg", "Livro criado com sucesso!");
                    res.redirect("/admin/livros");
                    console.log("Livro criado com sucesso!")
                    console.log(newBook)
                }).catch((err)=>{
                    req.flash("error_msg", "Não foi possivel criar o Livro");
                    console.log("Não foi possivel criar o Livro" + err)
                    res.redirect("/");
                })
            }
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno");
            console.log("error_msg", "Houve um erro interno")
            console.log(err)
            res.redirect("/");
        })
    }})


router.post("/editarLivro", upload.single('capa'), async(req, res)=>{
    var erros =[]
    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({texto: "Titulo inválido"})
        req.flash("error_msg", "Titulo inválido");
    }
    if(!req.body.autor || typeof req.body.autor == undefined || req.body.autor == null){
        erros.push({texto: "Autor inválido"})
        req.flash("error_msg", "Autor inválido");
    }
    if(!req.body.ano || typeof req.body.ano == undefined || req.body.ano == null){
        erros.push({texto: "Ano inválido"})
        req.flash("error_msg", "Ano inválido");
    }
    if(req.body.ano > 2021){
        erros.push({texto: "Não pode cadastrar um livro ainda não lançado"})
        req.flash("error_msg", "Não pode cadastrar um livro ainda não lançado");
    }
    if(!req.body.sinopse || typeof req.body.sinopse == undefined || req.body.sinopse == null){
        erros.push({texto: "sinopse inválida"})
        req.flash("error_msg", "sinopse inválida");
    }
    console.log(erros)


    if(erros.length > 0){
            res.redirect("/admin/novoLivro")
        }else{
            Book.findOne({_id: req.body.id}).then((book)=>{

                if(!req.file){
                    pathCapa = req.body.capaAtual
                }else{
                    pathCapa = req.file.path.replace(/\\/g, "/").substring("public".length);
                }
        
                book.titulo = req.body.titulo;
                book.autor = req.body.autor;
                book.ano = req.body.ano;
                book.sinopse = req.body.sinopse;
                book.capa = pathCapa;

        
                book.save().then(()=>{
                    req.flash("success_msg", "Livro editado com sucesso!");
                    res.redirect("/admin/livros");
                    console.log("Livro editado com sucesso!")
                }).catch((err)=>{
                    req.flash("error_msg", "Houve um erro ao salvar a edição")
                    res.redirect("/admin/livros")
                })
        
            }).catch((err)=>{
                req.flash("error_msg", "Livro não encontrado")
                console.log(err)
                res.redirect("/admin/livros")
            })
        }
})



router.post("/deleteBook", async(req, res)=>{

    console.log(req.body.id)
    Book.deleteOne({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "Livro deletado com sucesso!");
        res.status(200).json({success: true, msg: "Deletado com Sucesso"});
        console.log("Deletado")
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao deletar a edição")
        console.log("Houve um erro ao deletar a edição")
        res.redirect("/admin/livros")
    })
})

router.get("/novaCritica/:id",eCritico, async(req, res)=>{
    Book.findOne({_id:req.params.id}).then((book)=>{
    res.render("critica/newReview", {book: book})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao carregar a formulario")
        console.log(err)
        res.redirect("/")
    })
})
router.get("/novaCritica",eCritico, async(req, res)=>{
    Book.find().then((books)=>{
    res.render("critica/newReview", {books: books})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao carregar a formulario")
        console.log(err)
        res.redirect("/")
    })
})
router.post("/novaCritica", eCritico, async(req, res)=>{
    var erros =[]
    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({texto: "Titulo inválido"})
        req.flash("error_msg", "Titulo inválido");
    }
    if(!req.body.critico || typeof req.body.critico == undefined || req.body.critico == null){
        erros.push({texto: "Crítico inválido"})
        req.flash("error_msg", "Crítico inválido");
    }
    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null){
        erros.push({texto: "Conteúdo inválido"})
        req.flash("error_msg", "Conteúdo inválido");
    }
    if(!req.body.resumo || typeof req.body.resumo == undefined || req.body.resumo == null){
        erros.push({texto: "Resumo inválida"})
        req.flash("error_msg", "Resumo inválida");
    }
    if(req.body.livro == "0"){
        erros.push({texto: "Este livro não existe"})
        req.flash("error_msg", "Este livro não existe");
    }
    console.log(erros)


    if(erros.length > 0){
            res.redirect("/admin/novaCritica")
    }else{
        const newReview = new Review({
            titulo: req.body.titulo,
            critico: req.body.critico,
            conteudo: req.body.conteudo,
            resumo: req.body.resumo,
            livro: req.body.livro
        })
        console.log(newReview)
        
        newReview.save().then(()=>{
            req.flash("success_msg", "Crítica criado com sucesso!");
            res.redirect("/");
            console.log("Crítica criado com sucesso!")
            console.log(newReview)
        }).catch((err)=>{
            req.flash("error_msg", "Não foi possivel criar a Crítica");
            console.log("Não foi possivel criar a Crítica" + err)
            res.redirect("/");
        })
    }
})

module.exports = router; 