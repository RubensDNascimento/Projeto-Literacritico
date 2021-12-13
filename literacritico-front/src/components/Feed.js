import React, { useState } from 'react'
import './Feed.css'
import axios from 'axios';
import globals from '../config/Globals'
import CardCriticas from './CardCriticas'
const url = process.env.REACT_APP_BASE_API_URL + "login"
const urlCriticas = process.env.REACT_APP_BASE_API_URL + "admin/criticas"
let nome;
let criticasAux = [];

let eCritico;
if (globals.getUser()) {

    eCritico = globals.getUser().eCritico;
    nome = globals.getUser().nome
}
export default function Feed() {
    const [criticas, setCriticas] = useState([])
    if (criticas.length === 0) {

        axios.get(urlCriticas).then(res => {
            console.log(res.data.criticas)
            Object.entries(res.data.criticas.reviews).forEach(([key, value]) => {
                console.log("Key: " + key + " Value: " + value)
                if (criticasAux.length < res.data.criticas.reviews.length) {
                    criticasAux.push(value)
                }
            })
            setCriticas(criticasAux)
            console.log(criticas)

        })
    }



    return (
        <div>

            <div>


                {nome &&
                    <div class="card bg-light">
                        <div class="card-body ">
                            <h1 id="logocentral">Críticas</h1>
                            {eCritico == 1 ?
                                <a href="/novaCritica" id="buttongreenlink" ><button className="btn" id='buttongreen'  >Nova Crítica</button></a>:null
                            }
                            {nome &&
                                criticas.map(critica => {
                                    return (

                                        <CardCriticas key={critica.id} critica={critica} />)

                                })

                            }
                        </div>
                    </div>

                }

            </div>
        </div>
    )
}

