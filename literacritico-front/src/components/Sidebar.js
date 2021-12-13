import React, { useState } from 'react'
import './Navbar.css'
import '../index.css'
import globals from '../config/Globals'
import { Card, ListGroup, Row, Col } from 'react-bootstrap'
import axios from 'axios';
const url = process.env.REACT_APP_BASE_API_URL + "admin/livros"

let livrosAux = [];
let eCritico;
if (globals.getUser()) {

    eCritico = globals.getUser().eCritico;
}
export default function Navbar() {


        const [livros, setLivros] = useState([]);

        if (livros.length ===0) {
            axios.get(url).then(res=>{
                Object.entries(res.data.livros.books).forEach(([key, value]) => {
                    if (livrosAux.length < 10 || livrosAux.length < res.data.livros.books.length) {
                        livrosAux.push(value)
                    }
                })
                    setLivros(livrosAux)
                
            })
    }
    return (
        <div>
            <Card>
                {eCritico === 1 && 
                <a href="/novoLivro" ><button className="btn" id='buttongreenSide'  >Novo Livro</button></a>}
                
                <Row>
                    <h3 id="flexcenter">Livros</h3>
                    {livros.map(item => (
                        <a href={"/criticasPorLivro/" + item._id} id="sideA" ><div id="sideTitulo">{item.titulo}-({item.autor})</div></a>
                        
                        
                    ))}
                </Row>
            </Card>

        </div>
    )
        }

        