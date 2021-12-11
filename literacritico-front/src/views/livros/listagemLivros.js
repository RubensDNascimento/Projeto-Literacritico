import React, { Component } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import globals from '../../config/Globals'
import getLivros from '../../context/GetLivros'
import CardLivros from '../../components/CardLivros'
import { Container } from 'react-bootstrap'

let nome;
let livrosAux = [];
let livrosObj = {};
if (globals.getUser()) {

    nome = globals.getUser().nome;
}

export default class novoCritico extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            livros: []
        })
    }

    render() {
        if (this.state.livros.length === 0) {
            getLivros().then(res => {
                console.log("Livros Entries:" + Object.entries(res)[1][2])
                console.log(typeof livros)
                console.log(livrosObj)
                console.log("Livros:" + livrosObj)
                console.log("LivrosObj:" + livrosObj.length)
                console.log("Livros:" + livrosAux.length)
                console.log("res:" + res.length)
                for (let i = 0; i < res.length; i++) {
                    if (livrosAux.length < res.length) {
                        let aux = (Object.entries(res)[i])
                        console.log((Object.entries(res)[i])[1].titulo)
                        livrosAux.push(aux[1])
                        console.log(livrosAux.length)

                    }
                }
                this.setState({ livros: livrosAux })
                console.log(this.state.livros.length)
            })
        }
        return (
            <div>
                <Header />

                <Container>

                    <div class="card bg-light">
                        <h1 >Livros</h1>
                        {nome &&
                        <a href="/novoLivro" id='flexcenter' ><button class="btn" id='buttongreen'>Novo Livro</button></a>
                            
                        }
                        {this.state.livros.map(livro => {
                            return (
                                <CardLivros key={livro.id} livro={livro} />
                            )
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
}
