import React, { Component } from 'react'
import '../../index.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default class contato extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div class="card bg-light">
                    <div class="card-body">
                        <h1 >Contato</h1>
                        <h3>Envie uma mensagem</h3>
                        
                        <form method="POST" action="http://localhost:8080/send">
                            <p>
                                <label>Nome:</label>
                                <input type="text" name="nome" class="form-control" />
                            </p>
                            <p>
                                <label>Email:</label>
                                <input type="email" name="email" class="form-control" />
                            </p>
                            <p>
                                <label>Telefone:</label>
                                <input type="text" name="telefone" class="form-control"/>
                            </p>
                            <p>
                                <label>Mensagem:</label>
                                <textarea name="message" rows="5" class="form-control"></textarea>
                            </p>
                            <p>
                                <button class="btn "  id='buttongreen' type="submit">Enviar</button>
                            </p>
                        </form>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
