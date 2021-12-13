import React, { useState, useEffect } from 'react'
import axios from 'axios';
import globals from '../../config/Globals'
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import moment from 'moment';
import '../../index.css'
const urlDelete = process.env.REACT_APP_BASE_API_URL + "admin/deleteCritica"
let url = process.env.REACT_APP_BASE_API_URL
let eCritico;
if (globals.getUser()) {

    eCritico = globals.getUser().eCritico;
}

export default function Critica() {

    const { id } = useParams()
    const [critico, setCritico] = useState('');
    const [critica, setCritica] = useState({
        titulo: '',
        conteudo: '',
        resumo: '',
        livro: {},
        critico: critico
    });
    const [livro, setLivro] = useState('');
    const [data, setData] = useState(moment(critica.date).utc().format('DD/MM/YY'));

    if (critico === '' || livro === '') {

        axios.get(url + 'admin/getCritica/' + id).then(res => {
            console.log("Critica" + res.data.critica.review.titulo)
            setCritica(res.data.critica.review)
            console.log("Critica2: " + critica.titulo)

            axios.post(url + "admin/getCritico", { id: critica.critico }).then((res) => {
                setCritico(res.data.nome)
                console.log("Critico: " + res.data.nome)

                axios.post(url + "admin/getLivro", { id: critica.livro }).then((res) => {
                    setLivro(res.data)
                    console.log("Livro: " + res.data.titulo)
                })
            })
        })
    }

    return (
        <div>

            <Header />
                    <Container>
            <div className='card'>
                <div class="card-body row ">
                        <Row>
                                <h1 id="logocentral">{critica.titulo}</h1>
                            <small> Autor da critica: {critico}  </small>
                            <p><small> Data da publicação: {critica.date}  </small></p>
                            <Col >
                                <p>{critica.conteudo}</p>
                                </Col>
                            <Col xs lg="2">
                                <h2>Sobre o livro</h2>
                                <a ><img src={url + livro.capa} class="img-responsive row " /></a>
                                <h3 id="logocentral">{livro.titulo}</h3>
                                <h4>Autor: {livro.autor}</h4>
                                <h4>Ano de publicação: {livro.ano}</h4>
                                <a href={"/criticasPorLivro/"+livro._id}><button className='btn ' id='headersmallblue'>Ver mais criticas de {livro.titulo}</button></a>

                            </Col>
                        </Row>
                </div>
            </div>
                    </Container>
            <Footer />
        </div>
    )
}
