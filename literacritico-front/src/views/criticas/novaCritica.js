import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import axios from 'axios';
import globals from '../../config/Globals'
import { useNavigate } from 'react-router-dom'
import { Container } from 'react-bootstrap';
const urlLivros = process.env.REACT_APP_BASE_API_URL + "admin/getLivros"
const url = process.env.REACT_APP_BASE_API_URL + "admin/novaCritica"

let livrosAux = [];
export default function NovaCritica() {

    const critico = globals.getUser()._id
    const navigate = useNavigate()
    const [critica, setCritica] = useState({
        titulo: '',
        conteudo: '',
        resumo: '',
        livro: {}
    });
    const [erros] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [livros, setLivro] = useState([])
    if (livros.length === 0) {

        axios.get(urlLivros).then(res => {
            Object.entries(res.data.livros.books).forEach(([key, value]) => {
                if (livrosAux.length < res.data.livros.books.length) {

                    livrosAux.push(value)
                }
            })
            setLivro(livrosAux)

        })
    }

    function handleValidate() {
        if (!critica.titulo || typeof critica.titulo == undefined || critica.titulo == null) {
            erros.push("Titulo inválido")
        }
        if (!critica.conteudo || typeof critica.conteudo == undefined || critica.conteudo == null) {
            erros.push("Conteudo inválido")
        }
        if (!critica.resumo || typeof critica.resumo == undefined || critica.resumo == null) {
            erros.push("Resumo inválido")
        }
        if (!critica.livro || typeof critica.livro == undefined || critica.livro === null || Object.keys(critica.livro).length === 0) {
            erros.push("Livro inválido")
        }
    }


    const handleChange = (event) => {
        setCritica({ ...critica, [event.target.name]: event.target.value });
        console.log(critica.livro);
    }
    const handleSubmit = event => {
        event.preventDefault();
        erros.splice(0, erros.length)
        console.log("Critica: - " + critica.livro)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }

        handleValidate();
        console.log(erros);
        console.log(erros.length);
        if (erros.length < 1) {

            axios.post(url, {
                titulo: critica.titulo,
                conteudo: critica.conteudo,
                resumo: critica.resumo,
                livro: critica.livro,
                critico: critico,
            }
            ).then((res) => {
                console.log("Status: " + res.data.status)
                console.log("msg: " + res.data.msg)
                setRedirect(true)
            }).catch((err) => {
                console.log("Erros: " + erros)
                Object.entries(err.response.data.msg).forEach(([key, value]) => {
                    erros.push(value.texto)
                });
                console.log("Erros: " + erros)
                setCritica({
                    titulo: '',
                    conteudo: '',
                    resumo: '',
                    livro: critica.livro
                })
            })
        } else {
            alert(erros)
        }


    }

    return (
        <div>
            {redirect && navigate("/")}
            <Header />
            <Container>
                <div class="card bg-light">
                    <div class="card-body">
                        {erros.map(erro => {
                            return <div class="alert alert-danger">{erro}</div>
                        })
                        }
                        <h1 id="logocentral">Nova Crítica</h1>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="critico" value={critico} required />
                            <label for="titulo">Título:</label>
                            <input type="text" name="titulo" class="form-control" value={critica.titulo} onChange={handleChange} required />
                            <label for="conteudo">Conteúdo:</label>
                            <textarea name="conteudo" class="form-control" value={critica.conteudo} onChange={handleChange}></textarea>
                            <label for="resumo">Resumo:</label>
                            <textarea name="resumo" class="form-control" value={critica.resumo} onChange={handleChange}></textarea>
                            <label for="livro">Livro:</label>
                            <div class="input-group mb-3">
                                <select name="livro" class="form-select" onChange={handleChange}>
                                    {livros &&
                                        <option value=''> Selecione um Livro </option>
                                    }
                                    {livros.map((livro) => {
                                        console.log({ livros })
                                        return <option value={livro._id}> {livro.titulo} </option>
                                    })}
                                    {!livros && <option value="0">Nenhum livro encontrado</option>}

                                </select>
                                <a href="/novoLivro" ><button type="button" class="btn" id='buttongreen'>Novo Livro</button></a>
                            </div>
                            <a href="/"><button type="submit" class="btn " id='buttongreen'>Nova Crítica</button></a>



                        </form>
                    </div>
                </div>
            </Container>
            <Footer />
        </div>
    )

}
