import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import globals from '../../config/Globals'
import CardLivros from '../../components/CardLivros'
import { Container } from 'react-bootstrap'
import axios from 'axios';
const url = process.env.REACT_APP_BASE_API_URL + "admin/livros"

let eCritico;
let livrosAux = [];
if (globals.getUser()) {

    eCritico = globals.eCritico();
}

export default function ListagemLivros() {

    const [livros, setLivro] = useState([])
    if (livros.length === 0) {
        
        axios.get(url).then(res=>{
            Object.entries(res.data.livros.books).forEach(([key, value]) => {
                if (livrosAux.length < res.data.livros.books.length) {
                    livrosAux.push(value)
                }
            })
                setLivro(livrosAux)
            
        })
    }
    console.log(livros.length)
    return (
        <div>
            <Header />

            <Container>

                <div class="card bg-light">
                    <h1 >Livros</h1>
                    {eCritico &&
                        <a href="/novoLivro" id='flexcenter' ><button class="btn" id='buttongreen'>Novo Livro</button></a>

                    }
                    {livros.map(livro => {
                        return (
                        
                            <CardLivros key={livro.id} livro={livro} />)

                    })
                    }
                    {!livrosAux &&
                        <h4 class="mt-3" >Não há Livros cadastrados</h4>
                    }
                </div>
            </Container>
            <Footer />
        </div>
    )

}
