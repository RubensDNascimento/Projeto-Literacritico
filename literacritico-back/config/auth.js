
const JwtStrategy = require("passport-jwt").Strategy;
require("dotenv").config();
const ExtractJwt = require("passport-jwt").ExtractJwt;
var opts={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
    }


const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

require("../models/Users");
const User = mongoose.model("users")
module.exports = async function (passport) {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){

        User.findOne({email: jwt_payload.email}).then((user)=>{
            if (!user) {
                return done(null, false, {message: "Nenhum conta com este email encontrado"})
            }
            console.log(user)

            bcrypt.compare(jwt_payload.senha, user.senha, (erro, batem)=>{
                if (batem) {
                    return done (null, user)
                } else {
                    return done(null, false, {message: "Senha incorreta"})
                }
            })

        })
    }))

    passport.serializeUser((user, done)=> {
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user)=>{
            done(err, user)
        })
    })


}