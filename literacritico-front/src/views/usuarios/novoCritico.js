import React, { Component } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import axios from 'axios';
import globals from '../../config/Globals'
const url = process.env.REACT_APP_BASE_API_URL+"users/register"

export default class novoCritico extends Component {
    state = {
        nome:'',
        email:'',
        senha: '',
        eCritico: 1
      }

      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }
      handleSubmit = event => {
        event.preventDefault();
    
        axios.post( url, { 
            
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            eCritico: this.state.eCritico }).then((res)=>{
                globals.login(res.data.user, res.data.token)
                console.log(res.data.token)
                console.log(res.data.user)
                console.log("ok")
                
            })
      }
    render() {
        return (
            <div>
            <Header />

            <div class="card bg-light">
                    <div class="card-body" >
                        <h1 id="logocentral">Criar uma conta para um novo Crítico</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label for="nome">Nome:</label>
                            <input type="text" name="nome" class="form-control" onChange={this.handleChange} required />
                            <label for="email">Email:</label>
                            <input type="email" name="email" class="form-control" onChange={this.handleChange} required />
                            <label for="senha">Senha:</label>
                            <input type="password" name="senha" class="form-control" onChange={this.handleChange} required />
                            <label for="senha2">Digite a senha novamente:</label>
                            <input type="password" name="senha2" class="form-control" onChange={this.handleChange} required />

                            <input type="hidden" name="eCritico" value="1" required />
                            <button type="submit" class="btn" id='buttongreen'>Criar conta</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
