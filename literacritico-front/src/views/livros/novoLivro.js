import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
const url = process.env.REACT_APP_BASE_API_URL + "admin/novoLivro"

const data = new FormData()
export default function NovoLivro() {
    const navigate = useNavigate()
    const [state, setState] = useState({
        titulo: '',
        autor: '',
        ano: 0,
        sinopse: '',
        capa: {},
        erros: [],
        redirect: false
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
        console.log(state)
    }
    const imageHandle = (event) => {
        setState({ ...state, capa: event.target.files[0] })
        console.log(typeof event.target.files[0])
    }
    
    function handleValidate() {
        let erros=[]
        if (!state.titulo || typeof state.titulo == undefined || state.titulo == null) {
            erros.push("Titulo inválido")
        }
        if (!state.autor || typeof state.autor == undefined || state.autor == null) {
            erros.push("Autor inválido")
        }
        if (!state.ano || typeof state.ano == undefined || state.ano == null) {
            erros.push("Ano inválido")
        }
        if (state.ano > 2021) {
            erros.push("Não lançar um livro ainda não lançado")
        }
        if (!state.sinopse || typeof state.sinopse == undefined || state.sinopse === null) {
            erros.push("Sinopse inválida")
        }
        if (!state.capa || typeof state.capa == undefined || state.capa === null || Object.keys(state.capa).length ===0) {
            erros.push("Capa inválida")
        }
        return erros
    }
    const handleSubmit = event => {
        event.preventDefault();
        state.erros.splice(0, state.erros.length)
        state.erros.push(handleValidate())
        data.append("titulo", state.titulo)
        data.append("autor", state.autor)
        data.append("ano", state.ano)
        data.append("sinopse", state.sinopse)
        data.append("capa", state.capa)

        for (var key of data.entries()) {
            console.log(key[1]);
        }
        console.log(data)
        console.log(state.erros)

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        if (state.erros.length < 1) {
            axios.post(url, data, config).then((res) => {
                console.log("Status: " + res.data.status)
                console.log("msg: " + res.data.msg)
                setState({ ...state, redirect: true })
    
            }).catch((err) => {
                console.log("Erros: " + state.erros)
                console.log(Object.entries(err.response.data.msg))
                Object.entries(err.response.data.msg).forEach(([key, value]) => {
                    state.erros.push(value.texto)
                });
    
                console.log("Erros: " + state.erros)
                setState({ ...state, titulo:''})
                setState({ ...state, autor:''})
                setState({ ...state, ano:0 })
                setState({ ...state, sinpse:''})
                setState({ ...state, capa:{}})
                console.log("tate: " + state.titulo)
                data.delete("titulo")
                data.delete("autor")
                data.delete("ano")
                data.delete("sinopse")
                data.delete("capa")
    
            })
        }else{alert(state.erros)}
        
    }

    return (
        <div>

            {state.redirect && navigate("/listagemLivros")}

            <Header />
            <Container>

                <div class="card bg-light">
                    <div class="card-body">
                        {state.erros.map(erro => {
                            return <div class="alert alert-danger">{erro}</div>
                        })
                        }

                        <h1 id="logocentral">Novo livro</h1>
                        <form onSubmit={handleSubmit}>
                            <label for="titulo">Título:</label>
                            <input type="text" name="titulo" class="form-control" value={state.titulo} onChange={handleChange} required />
                            <label for="autor">Autor:</label>
                            <input type="text" name="autor" class="form-control" value={state.autor} onChange={handleChange} required />
                            <label for="ano">Ano de publicação:</label>
                            <input type="number" step="1" name="ano" class="form-control" value={state.ano} onChange={handleChange} required />
                            <label for="sinopse">Sinopse:</label>
                            <textarea name="sinopse" class="form-control" onChange={handleChange}>{state.sinopse}</textarea>
                            <label for="capa">Capa:</label>
                            <input type="file" class="form-control" id="inputGroupFile02" name="capa" accept="image/png, image/jpeg" onChange={imageHandle} />
                            <button type="submit" class="btn" id='buttongreen'>Novo Livro</button>

                        </form>
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )
}

