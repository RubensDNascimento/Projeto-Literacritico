import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import axios from 'axios';
import globals from '../../config/Globals';
import { Container } from 'react-bootstrap';

const url = process.env.REACT_APP_BASE_API_URL+"users/edit"
let nome;
let email;
if (globals.getUser()) {
    
 nome = globals.getUser().nome;
 email = globals.getUser().email;
}
export default function EditarNome(){

    

    const [state, setState] = useState({
        nome: ''
      })
      
    const [erros] = useState([])

    const handleChange = (event) => {
        setState({ nome: event.target.value });
      }
    const handleSubmit = event => {
        event.preventDefault();
        erros.splice(0, erros.length)
    
        axios.put( url, { 
            
            email: email,
            nome: state.nome }).then((res)=>{
                
                globals.setUser(res.data.user)
                window.location.replace('/')
            }).catch((err) => {
                console.log("Erros: " + erros)
                    erros.push(err.response.data.msg)
                setState({
                    nome: ''
                })
            })
      }
        
        return (
            <div>
                <Header />
                <Container>
                {erros.map(erro => {
                            return <div class="alert alert-danger">{erro}</div>
                        })
                        }
                <div class="card bg-light">
                        <div class="card-body" >
                        <h1 id="logocentral">Editar nome</h1>
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="email" value={email} />
                            <label for="nome">Nome</label>
                            <input type="text" class="form-control" name="nome" placeholder={nome} value={state.nome} onChange={handleChange}/>
                            <br/>
                            <button class ="btn" type ="submit" id='buttongreen' >Editar</button>
                        </form>
                    </div>
                </div>
                </Container>
                <Footer />
            </div>
            )
    }

