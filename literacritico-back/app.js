const express = require('express');
const handlebars = require('express-handlebars');
const app = express();
const axios = require('axios');
const cors = require('cors')
const admin = require('./routes/admin');
const path = require('path');
const session =require('express-session');
const flash = require("connect-flash");
const nodemailer = require('nodemailer');
const users = require("./routes/users");
const mongoose  = require('mongoose');
const passport = require('passport');
const {estaLogado} = require('./helpers/accessControl');
require("./config/auth")(passport);
const helpers = require('handlebars-helpers');
const { inspect } = require('util');
const markdown = helpers.markdown();
require("dotenv").config();
require("./models/Book");
require("./models/Reviews");
const Book = mongoose.model("book");
const Review = mongoose.model("review");
const bcrypt = require('bcryptjs');

const utils = require('./helpers/utils');
const jwt = require('jsonwebtoken');


require("./models/Users");
const User = mongoose.model("users")

app.use(session({
    secret:"asidjadjaijdoa",
    resave: true,
    saveUninitialized: true
}));
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

app.use((req, res, next) =>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
})

app.use("/uploads", express.static("uploads"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.engine('handlebars', handlebars({defaultLayout: 'main', runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }, helpers: markdown}));
app.set('view engine', 'handlebars');


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB, { useNewUrlParser: true }).then(()=>{
    console.log("Conectado ao banco");
}).catch((err)=>{
    console.log("Erro ao conectar ao banco:" + err);
})

app.use(express.static(path.join(__dirname,"public")));



app.get('/', async(req, res)=>{



    Review.find().populate('livro').sort({data: "desc"}).then((reviews)=>{
        res.render('index', {reviews:reviews})
    }).catch((err)=>{
        req.flash("error_msg", "Não foi carregar as Críticas");
        console.log("Não foi possivel criar a Crítica" + err)
    })
})
app.get('/posts', estaLogado, async(req, res)=>{
    res.send('Lista de posts')
})
app.get('/desenvolvedor', estaLogado, async(req, res)=>{
    res.render("pages/desenvolvedor")
})
app.get('/tecnologias', estaLogado, async(req, res)=>{
    res.render('pages/tecnologias')
})
app.get('/projeto', estaLogado,  async(req, res)=>{
    res.render('pages/projeto')
})
app.get('/contato', estaLogado,  (req, res)=>{
    res.render('pages/contato')
})

app.post("/login", async function(req, res) {
    console.log("Email: " + req.body.email)
    User.findOne({email: req.body.email}).then((user)=>{
        if (!user) {
            console.log("Usuário não encontrado")
            res.status(401).json({success: false, msg: "Usuário não encontrado"});
        }
        console.log("Nome user: "+user.nome)
        console.log(req.body.senha)
        bcrypt.compare(req.body.senha, user.senha, (erro, batem)=>{
            if (batem) {
                console.log("Batem")
                const tokenObject = utils.issueJWT(user);
                res.status(200).json({success: true,user:user, token: tokenObject.token, msg: "Sucesso"});
            } else {
                console.log("Senha Incorreta")
                res.status(401).json({success: false, msg: "Senha Incorreta"});
            }
        })
      }).catch((err)=>{
        if (err) {
            console.log("Erro:" + err)
        }
    })
    })
    
app.get("/login", passport.authenticate('jwt', { session: false }),
function(req, res) {
    res.status(200).json({success: true, msg:'Logado'})
}
);

app.post('/send', async(req, res) => {
    const output = ` 
        <p>Você tem uma nova mensagem</p>    
        <h3>Detalhes do contato</h3>    
        <ul>        
            <li>Name: ${req.body.nome}</li>        
            <li>Telefone: ${req.body.telefone}</li>        
            <li>Email: ${req.body.email}</li>    
        </ul>    
        <h3>Mensagem:</h3>    
        <p>${req.body.message}</p>`
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: "rubensnascimentoteste@gmail.com", // generated ethereal user
          pass: "TesteWeb123", // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info =  transporter.sendMail({
        from: '"Rubens" <rubensnascimentoteste@gmail.com>', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: `Mensagem de ${req.body.nome}`, // Subject line
        text: `Mensagem de ${req.body.nome}`, // plain text body
        html: output, // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.render('pages/contato')

});

app.use('/admin', admin)
app.use('/users', users)

app.listen(8080, function () {
    console.log("Rodando!");
});