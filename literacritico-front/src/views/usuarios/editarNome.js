import React, { Component } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import axios from 'axios';
import globals from '../../config/Globals';
import { useNavigate  } from "react-router-dom";

const url = process.env.REACT_APP_BASE_API_URL+"users/edit"
let nome;
let email;
if (globals.getUser()) {
    
 nome = globals.getUser().nome;
 email = globals.getUser().email;
}
let navigate;
export default class editarNome extends Component {

    

    state = {
        nome: '',
        email:'rubens@123',
        
      }

      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }
      handleSubmit = event => {
        event.preventDefault();
    
        axios.put( url, { 
            
            email: this.state.email,
            nome: this.state.nome }).then((res)=>{
                
                globals.setUser(res.data.user)
            }
            )
      }
    render() {
        
        return (
            <div>
                <Header />

                <div class="card bg-light">
                        <div class="card-body" >
                        <h1 id="logocentral">Editar nome</h1>
                        <form onSubmit={this.handleSubmit}>
                            <input type="hidden" name="email" value={email} />
                            <label for="nome">Nome</label>
                            <input type="text" class="form-control" name="nome" placeholder={nome} onChange={this.handleChange}/>
                            <br/>
                            <button class ="btn" type ="submit" id='buttongreen' >Editar</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
            )
    }
}
