const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Users");
const User = mongoose.model("users");
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { doesNotMatch } = require('assert');
const { eCritico } = require('../helpers/accessControl');
require("dotenv").config();

router.get("/register", async(req, res)=>{
    res.render("users/register");
})
router.get("/registerCritico", async(req, res)=>{
    res.render("users/registerCritico");
})

router.post("/register", async(req, res)=>{
    var erros =[]
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"})
    }
    if(req.body.senha.length < 4){
        erros.push({texto: "Senha muito curta"})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "As senhas são diferentes."})
    }
    console.log(erros)

    if(erros.length > 0){
        res.status(401).json({success: false, erros:erros});
    }else{
        User.findOne({email: req.body.email}).then((user) => {
            if(user){
                req.flash("error_msg", "Já existe uma conta esse email");
                console.log("Já existe uma conta esse email")
                res.redirect("/users/register")
            }else{
                
                const newUser = new User({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    eCritico: req.body.eCritico
                })

                bcrypt.genSalt(10,(erro, salt) => {
                    bcrypt.hash(newUser.senha, salt, (erro, hash) =>{
                        if (erro) {
                            req.flash("error_msg", "Não foi possivel salvar o usuário");
                            console.log("Não foi possivel salvar o usuário")

                        }

                        newUser.senha = hash;

                        newUser.save().then(()=>{
                            res.status(200).json({success: true,user:newUser, msg: "Sucesso"});
                            console.log("Usuario criado com sucesso!")
                        }).catch((err)=>{
                            req.flash("error_msg", "Não foi possivel criar o usuário");
                            console.log("Não foi possivel criar o usuário" + err)
                            res.redirect("/");
                        })

                    })
                })
            }
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno");
            console.log("error_msg", "Houve um erro interno")
            console.log(err)
            res.redirect("/");
        })
    }



})



router.get("/edit/:id", async(req,res)=>{
    res.render("users/editName");
})
router.put("/edit", async(req,res)=>{
    var erros =[]
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"});
        console.log("Nome inválido")
    }
    console.log(req.body)

    User.findOne({email: req.body.email}).then((user)=>{
        console.log(user)
        user.nome = req.body.nome;
        console.log(user)

        user.save().then(()=>{
            req.flash("success_msg", "Usuário editado com sucesso!");
            res.status(200).json({success: true,user:user, msg: "Sucesso"});
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro ao salvar novo nome");
                console.log(err)
                res.redirect("/");
        })

    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao editar nome");
            console.log(err)
            res.redirect("/");
    })

})

router.get('/logout', async(req, res)=>{
    req.logout();
    req.flash('seccess_msg', "Usuário deslogado!");
    res.redirect('/');
})
router.get('/logado', async(req, res)=>{
    if (res.locals.user) {
        res.send({loggedIn: true, user: res.locals.user})
    } else {
        res.send({loggedIn: false})
    }
})

module.exports = router;