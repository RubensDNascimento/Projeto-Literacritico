import React, { Component, useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import Feed from '../../components/Feed'
import { Container, Row, Col } from 'react-bootstrap'
import globals from '../../config/Globals'
import { useLocation } from 'react-router-dom'
let eCritico;
let nome;
if (globals.getUser()) {

    eCritico = globals.getUser().eCritico;
    nome = globals.getUser().nome;
}


export default function Index()  {

    const { state } = useLocation();
    const [erros] = useState([])
    if (state) {
        const {msg} = state;
        if (msg ) {
            if (!erros.includes(msg)) {
                erros.push(msg)
            }
        }
    }
        return (
            <div>
                <Header />
                <Container>
                    <div class="card bg-light">
                        <div class="card-body" id="logocentral">
                        {erros.map(erro => {
                            return <div class="alert alert-danger">{erro}</div>
                        })
                        }
                            <img src="/images/literacritico-logo.png" alt="Logo" style={{ width: 300 }} />
                            <p>O projeto se trata de uma especie de blog e rede social literario onde os administradores poderão publicar suas resenhas de suas ultimas
                                leituras e os usuarios padrões terão acessos à essas resenhas</p>
                        </div>
                    </div>
                    {nome &&
                        <div>
                            <Row>
                                <Col xs lg="2"><Sidebar /></Col>
                                <Col><Feed /></Col>
                            </Row>
                        </div>
                    }
                </Container>
                <Footer />
            </div>
        )
    }

