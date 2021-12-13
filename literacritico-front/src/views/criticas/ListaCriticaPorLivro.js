import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import globals from '../../config/Globals'
import CardLivros from '../../components/CardLivros'
import { Container } from 'react-bootstrap'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import CardCriticas from '../../components/CardCriticas'
const url = process.env.REACT_APP_BASE_API_URL + "admin/getCriticaPorLivro/"
const urlLivro = process.env.REACT_APP_BASE_API_URL + "admin/getLivro/"

let nome;
let criticaAux = [];
let eCritico;
if (globals.getUser()) {

    eCritico = globals.getUser().eCritico;
}
export default function ListaCriticaPorLivro() {
    
    const { id } = useParams()
    const [criticas, setCriticas] = useState([])
    const [livro, setLivro] = useState([])

    useEffect(() => {
        axios.get(url + id).then(res=>{
            console.log(res.data);
            Object.entries(res.data.criticas).forEach(([key, value]) => {
                if (criticaAux.length < res.data.criticas.length) {
                    criticaAux.push(value)
                }
            })
            setCriticas(criticaAux)
        })
        axios.post(urlLivro, {id:id}).then(res=>{
            console.log("Nome do Livro: "+res.data.titulo);
            setLivro(res.data.titulo)
        })
    },[])

    return (
        <div>
            <Header/>
            <Container>
            <div class="card bg-light">
                    <h1 >Criticas de {livro}</h1>
                    {eCritico == 1 &&
                        <a href="/novaCritica" id='flexcenter' ><button class="btn" id='buttongreen'>Nova critica</button></a>

                    }
                    {criticas.map(critica => {
                        return (
                        
                            <CardCriticas key={critica.id} critica={critica} />)

                    })
                    }
                    {!criticaAux &&
                        <h4 class="mt-3" >Não há Criticas desse livro</h4>
                    }
                </div>
            </Container>
            <Footer/>
        </div>
    )
}
