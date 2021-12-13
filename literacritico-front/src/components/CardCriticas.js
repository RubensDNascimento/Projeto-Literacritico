import React, { useState, useEffect  } from 'react'

import axios from 'axios';
import globals from '../config/Globals'
import { Container } from 'react-bootstrap';
import moment from 'moment';
import { useNavigate  } from 'react-router-dom'
import './Cards.css'
const urlDelete = process.env.REACT_APP_BASE_API_URL + "admin/deleteCritica"
let url = process.env.REACT_APP_BASE_API_URL 

let eCritico;
if (globals.getUser()) {

    eCritico = globals.getUser().eCritico;
}



export default function CardCriticas({ critica }) {
    console.log("CARD")
    const navigate = useNavigate()

    const [id, setId] = useState(critica);
    const [critico, setCritico] = useState('');
    const [livro, setLivro] = useState('');
    const [data, setData] = useState(moment(critica.date).utc().format('DD/MM/YY'));

    
    useEffect(() => {
        axios.post(url + "admin/getCritico", {id:critica.critico}).then((res)=>{
            setCritico(res.data.nome)
            console.log("Critico: "+ res.data.nome)
        })
        axios.post(url + "admin/getLivro", {id:critica.livro}).then((res)=>{
            setLivro(res.data.titulo)
            console.log("Livro: "+ res.data.titulo)
        })
    }, [])


    const handleSubmit = event => {
        event.preventDefault();
        setId(critica._id)

        axios.post(urlDelete, { id: id }).then((res) => {
            console.log(res.status)
            console.log(res.data)
            console.log("ok")
            window.location.reload()
        })
    }
    return (
        <div>
            <Container>

                <div className='card'>
                    <div class="card-body row ">
                        <h4 id="logocentral"> {critica.titulo} </h4>
                        <div class="col-4" >
                            <small> Autor: {critico}  </small>
                            <p><small> Data da publicação: {data}  </small></p>
                            
                            <h5>Livro: {livro} </h5>
                            {eCritico === 1 &&
                                <div>
                                    <a href={"/editarCritica/" + critica._id } ><button class="btn" id='buttongreen'>Editar Critica</button></a>
                                    <form onSubmit={handleSubmit}>
                                        <input type="hidden" name="id" value={critica._id} />
                                        <a id='headersmallred' href="/"><button className='btn ' id='headersmallred'>Deletar</button></a>
                                    </form>
                                </div>

                            }
                        </div>
                        <div class="col-4" >
                            <p id='textarea'> {critica.resumo}  </p>
                            <a href={"/critica/"+critica._id}><button className='btn ' id='headersmallblue'>Ver Mais</button></a>
                        </div>
                    </div>
                </div>
            </Container>


        </div>
    )
}

