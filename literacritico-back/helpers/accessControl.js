
const jwt = require('jsonwebtoken');
require("dotenv").config();
module.exports ={
    eCritico: function (req, res, next) {
        console.log(req.user.eCritico)
        if (req.user.eCritico == 1) {
            return next();
        }else{
            res.status(401).json({success: false, msg: "Usuario não é um Critico"})
        }
    },

    estaLogado: function (req, res, next) {
        const authHeader = req.headers.authorization;    
        if (authHeader) {
            const token = authHeader.split(' ')[2];
            console.log(token);
            jwt.verify(token, process.env.SECRET, (err, user)=>{
                console.log("------------");
                Object.entries(user).forEach(([key, value]) => {
                    console.log(value)
                });
                if (err){
                    return res.status(403).json({success: false, msg: "Token invalido"})
                }else{

                    req.user = user;
                    console.log(req.user);
                    next();
                }
            })
        }else{
            res.status(401).json({success: false, msg: "Usuario não esta logado"})
        }
    }
}