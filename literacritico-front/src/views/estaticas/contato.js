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
        if (erros.length < 1) {

            axios.post(url, state).then(res => {
                alert("Mensagem enviada")
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
                        <h1 >Contato</h1>
                        <h3>Envie uma mensagem</h3>

                        <form onSubmit={handleSubmit}>
                            <p>
                                <label>Nome:</label>
                                <input type="text" name="nome" class="form-control" onChange={handleChange} />
                            </p>
                            <p>
                                <label>Email:</label>
                                <input type="email" name="email" class="form-control" onChange={handleChange} />
                            </p>
                            <p>
                                <label>Telefone:</label>
                                <input type="text" name="telefone" class="form-control" onChange={handleChange} />
                            </p>
                            <p>
                                <label>Mensagem:</label>
                                <textarea name="message" rows="5" class="form-control" onChange={handleChange}></textarea>
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

