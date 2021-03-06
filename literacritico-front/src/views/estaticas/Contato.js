import React, { useState } from 'react'
import '../../index.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import axios from 'axios'
import { Container } from 'react-bootstrap';
const url = process.env.REACT_APP_BASE_API_URL + "send"

export default function Contato() {
    const [state, setState] = useState({
        nome: '',
        email: '',
        telefone: '',
        mensagem: ''
    })
    const [erros] = useState([])

    function handleValidate() {
        if (!state.nome || typeof state.nome == undefined || state.nome == null) {
            erros.push("Nome inválido")
        }
        if (!state.email || typeof state.email == undefined || state.email == null) {
            erros.push("Email inválido")
        }
        if (!state.telefone || typeof state.telefone == undefined || state.telefone == null) {
            erros.push("Telefone inválido")
        }
        if (!state.mensagem || typeof state.mensagem == undefined || state.mensagem === null) {
            erros.push("Mensagem inválida")
        }
    }

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    }
    const handleSubmit = event => {
        event.preventDefault();
        erros.splice(0, erros.length)
        handleValidate()
        if (erros.length < 1) {

            axios.post(url, state).then(res => {
                alert("Mensagem enviada")
            }).catch(err=>{
                Object.entries(err.response.data.msg).forEach(([key, value]) => {
                    erros.push(value)
                });
                setState({
                    nome: '',
                    email: '',
                    telefone: '',
                    mensagem: ''
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
                    <div class="card-body">
                            {erros.map(erro => {
                                return <div class="alert alert-danger">{erro}</div>
                            })
                            }
                        <h1 >Contato</h1>
                        <h3>Envie uma mensagem</h3>

                        <form onSubmit={handleSubmit}>
                            <p>
                                <label>Nome:</label>
                                <input type="text" name="nome" class="form-control" value={state.nome} onChange={handleChange} required />
                            </p>
                            <p>
                                <label>Email:</label>
                                <input type="email" name="email" class="form-control" value={state.email} onChange={handleChange}  required  />
                            </p>
                            <p>
                                <label>Telefone:</label>
                                <input type="text" name="telefone" class="form-control" value={state.telefone} onChange={handleChange} required />
                            </p>
                            <p>
                                <label>Mensagem:</label>
                                <textarea name="mensagem" rows="5" class="form-control" value={state.mensagem} onChange={handleChange}></textarea>
                            </p>
                            <p>
                                <button class="btn " id='buttongreen' type="submit">Enviar</button>
                            </p>
                        </form>
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )
}

