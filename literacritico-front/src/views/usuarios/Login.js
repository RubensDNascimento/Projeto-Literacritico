import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import axios from 'axios';
import globals from '../../config/Globals'
import CardCriticas from '../../components/CardCriticas'
import { Container } from 'react-bootstrap';
const url = process.env.REACT_APP_BASE_API_URL + "login"
export default function Login() {

    const [senha, setSenha] = useState('')
    const [email, setEmail] = useState('')
    const [erros] = useState([])

    const handleSenha = (event) => {
        setSenha(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const config = {
        headers: {
            'content-type': "application/json"
        }
    }
    const handleSubmit = event => {
        event.preventDefault();
        erros.splice(0, erros.length)
        console.log("Email: " + email)
        console.log("Senha: " + senha)

        axios.post(url, {
            email: email,
            senha: senha
        }, config).then((res) => {
            globals.login(res.data.user, res.data.token)
            console.log("Token" + res.data.token)
            console.log("User" + res.data.user)
            window.location.replace('/')
            console.log("ok")

        }).catch(err => {
            console.log("Erros: " + erros)
            console.log(Object.entries(err.response.data.msg))
            erros.push(err.response.data.msg)
            setEmail('')
            setSenha('')
        })
    }
    return (
        <div>
            <Header />
            <Container>
                <div class="card col bg-light">
                    <h1>Login</h1>
                    <div class="card-body">
                        {erros.map(erro => {
                            return <div class="alert alert-danger">{erro}</div>
                        })
                        }
                        <form onSubmit={handleSubmit}>
                            <label for="email">Email</label>
                            <input type="email" class="form-control" name="email" value={email} required onChange={handleEmail} />
                            <label for="senha">Senha</label>
                            <input type="password" class="form-control" name="senha" value={senha}  required onChange={handleSenha} />
                            <a class="nav-link" href="/novoUsuario">Criar conta</a>
                            <button class="btn" id="buttongreen" type="submit"  >Entrar</button>
                        </form>
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )
}
