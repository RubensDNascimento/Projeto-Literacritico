import React, { Component } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import { Card } from 'react-bootstrap'

export default class novoCritico extends Component {
    render() {
        return (
            <div>
                <Header />

                <div class="card bg-light">
                    <div class="card-body">
                        <h1 id="logocentral">Editar livro</h1>
                        <form action="http://localhost:8080/admin/editarLivro" method="post" enctype="multipart/form-data">
                            <input type="hidden" name="id" value="{{book._id}}"/>
                                <label for="titulo">Título:</label>
                                <input type="text" name="titulo" class="form-control" value="{{book.titulo}}" required/>
                                    <label for="autor">Autor:</label>
                                    <input type="text" name="autor" class="form-control" value="{{book.autor}}" required/>
                                        <label for="ano">Ano de publicação:</label>
                                        <input type="number" step="1" name="ano" class="form-control" value="{{book.ano}}" required/>
                                            <label for="sinopse">Sinopse:</label>
                                            <textarea name="sinopse" class="form-control">book.sinopse </textarea>
                                            <div class=" row align-items-start">
                                                <div class="col-8">
                                                    <label for="capa">Capa:</label>
                                                    <input type="file" class="form-control" id="inputGroupFile03" name="capa" accept="image/png, image/jpeg" value=""/>
                                                    <input type ="hidden" name="capaAtual" value=""/>
                                                    <button type ="submit" class ="btn "  id='buttongreen'>Editar Livro</button>
                                                    </div>
                                                    <div class ="col-2" >
                                                    <label for="capa">Capa atual: </label>
                                                    <img src="#" width="150px" class ="img-responsive" />
                                                    </div>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    <Footer />
                                </div>
                                )
    }
}
