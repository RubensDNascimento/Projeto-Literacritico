import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import axios from 'axios';
import globals from '../../config/Globals'
import { Container } from 'react-bootstrap';
const url = process.env.REACT_APP_BASE_API_URL + "users/register"

export default function NovoCritico() {
    const [state, setState] = useState({
        nome: '',
        email: '',
        senha: '',
        senha2: '',
        eCritico: 1
    })
    const [erros] = useState([])
    const [sucesso, setSucesso] = useState('')

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        console.log(state.nome)
    }

    function handleValidate() {
        if (!state.nome || typeof state.nome === undefined || state.nome === null) {
            erros.push("Nome inválido")
        }
        if (!state.email || typeof state.email === undefined || state.email === null) {
            erros.push("Email inválido")
        }
        if (!state.senha || typeof state.senha === undefined || state.senha === null) {
            erros.push("Senha invalida inválido")
        }
        if (state.senha.length < 4) {
            erros.push("A senha precisa ter ao menos 4 digitos")
        }
        if (state.senha !== state.senha2) {
            erros.push("As senha não podem ser diferentes")
        }
        return erros
    }
    const handleSubmit = event => {
        event.preventDefault();
        erros.splice(0, erros.length)
        setSucesso('')
        console.log(state.email)
        console.log(state.nome)
        handleValidate()
        if (erros.length < 1) {

            axios.post(url, {
                nome: state.nome,
                email: state.email,
                senha: state.senha,
                senha2: state.senha2,
                eCritico: state.eCritico
            }).then((res) => {
                console.log(res.data.msg)
                setSucesso(res.data.msg);
                console.log(sucesso)
                setState({
                    nome: '',
                    email: '',
                    senha: '',
                    senha2: '',
                    eCritico: 1
                })
            }).catch((err) => {
                console.log("Erros: " + state.erros)
                Object.entries(err.response.data.erros).forEach(([key, value]) => {
                    erros.push(value.texto)
                });
                setState({
                    nome: '',
                    email: '',
                    senha: '',
                    senha2: '',
                    eCritico: 1
                })
            })
        } else {
            alert(erros)
        }

    }
    return (
        <div>
            <Header />

            <Container>
                <div class="card bg-light">
                    <div class="card-body" >
                        {erros.map(erro => {
                            return <div class="alert alert-danger">{erro}</div>
                        })
                        }

                        {sucesso &&
                            <div class="alert" id='msgsucesso' >{sucesso}</div>

                        }

                        <h1 id="logocentral">Criar uma conta para um novo Crítico</h1>
                        <form onSubmit={handleSubmit}>
                            <label for="nome">Nome:</label>
                            <input type="text" name="nome" class="form-control" value={state.nome} onChange={handleChange} required />
                            <label for="email">Email:</label>
                            <input type="email" name="email" class="form-control" value={state.email} onChange={handleChange} required />
                            <label for="senha">Senha:</label>
                            <input type="password" name="senha" class="form-control" value={state.senha} onChange={handleChange} required />
                            <label for="senha2">Digite a senha novamente:</label>
                            <input type="password" name="senha2" class="form-control" value={state.senha2} onChange={handleChange} required />

                            <input type="hidden" name="eCritico" value="1" required />
                            <button type="submit" class="btn" id='buttongreen'>Criar conta</button>
                        </form>
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )
}
