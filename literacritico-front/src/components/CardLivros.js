import React, { Component, state, useState } from 'react'

import axios from 'axios';
import globals from '../config/Globals'
import { Container } from 'react-bootstrap';
const urlDelete = process.env.REACT_APP_BASE_API_URL + "admin/deleteBook"
let urlCapa = process.env.REACT_APP_BASE_API_URL

let eCritico;
if (globals.getUser()) {

    eCritico = globals.getUser().eCritico;
}



export default function CardLivros({ livro }) {
    console.log("CARD")

    const [id, setId] = useState(livro);

    const handleSubmit = event => {
        event.preventDefault();
        setId(livro._id)

        axios.post(urlDelete, { id: id }).then((res) => {
            console.log(res.status)
            console.log(res.data)
            console.log("ok")
        })
    }
    return (
        <div>
            <Container>

                <div className='card'>
                    <div class="card-body row ">
                        <div class="col-4" >
                            <h4> {livro.titulo} </h4>
                            <h5> {livro.autor}  </h5>
                            <small> {livro.ano}  </small>
                            {eCritico === 1 &&
                                <div>
                                    <a href={"/editarLivro/" + livro._id } ><button class="btn" id='buttongreen'>Editar Livro</button></a>
                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="id" value={livro._id} />
                                        <a id='headersmallred' href="/"><button className='btn ' id='headersmallred'>Deletar</button></a>
                                    </form>
                                </div>

                            }
                        </div>
                        <div class="col-4" >
                            <p > {livro.sinopse}  </p>
                        </div>
                        <div class="col-4 ">
                            <a ><img src={urlCapa + livro.capa} width="250px" class="img-responsive row " /></a>
                        </div>
                    </div>
                </div>
            </Container>


        </div>
    )
}

