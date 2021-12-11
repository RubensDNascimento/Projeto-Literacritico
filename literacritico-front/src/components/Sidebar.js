import React, { Component } from 'react'
import './Navbar.css'
import '../index.css'
import { Card, ListGroup, Row, Col } from 'react-bootstrap'

export default class Navbar extends Component {
    render() {

        const livros = [
            { titulo: "Ola", autor: 'Um' },
            { titulo: "Ola", autor: 'Um' },
            { titulo: "Olafdsffsdfsfasdasdasdadasda", autor: 'Usdfsdfm' },
            { titulo: "Ola", autor: 'Um' },
            { titulo: "Ola", autor: 'Um' }
        ]

        return (
            <div>
                <Card>
                    <a href="/novoLivro" ><button className="btn" id='buttongreenSide'  >Novo Livro</button></a>
                    <Row>
                        {livros.map(item => (
                            
                            <div>{item.titulo} - {item.autor}</div>
                            
                        ))}
                    </Row>
                </Card>

            </div>
        )
    }
}
