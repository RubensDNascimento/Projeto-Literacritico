import React, { Component } from 'react'
import './Feed.css'
import axios from 'axios';
import globals from '../config/Globals'
const url = process.env.REACT_APP_BASE_API_URL+"login"
let nome;
let deslogado;
if (globals.getUser()) {
    
 nome = globals.getUser().nome;
 deslogado = null
}
export default class Feed extends Component {

    state = {
        email:'',
        senha: ''
      }

      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }
      handleSubmit = event => {
        event.preventDefault();
    
        axios.post( url, { 
            
            email: this.state.email,
            senha: this.state.senha }).then((res)=>{
                globals.login(res.data.user, res.data.token)
                console.log(res.data.token)
                console.log(res.data.user)
                console.log("ok")
                
            })
      }

    render() {
        
        return (
            <div>

                <div>
                    <div class="card bg-light">
                        <div class="card-body" id="logocentral">
                            <img src="/images/literacritico-logo.png" alt="Logo" style={{ width: 300 }} />
                            <p>O projeto se trata de uma especie de blog e rede social literario onde os administradores poderão publicar suas resenhas de suas ultimas
                                leituras e os usuarios padrões terão acessos à essas resenhas</p>
                        </div>
                    </div>


                    {nome &&
                    <div class="card bg-light">
                        <h1 >Críticas</h1>
                        #if eCritico
                        <a href="/admin/novaCritica" id="buttongreenlink" ><button className="btn" id='buttongreen'  >Nova Crítica</button></a>
                        end if
                        <div class="card-body ">
                            <h3>Usuário Logado</h3>
                        </div>
                    </div>
                    
                    }
                    {!nome &&
                    
                    <div class="card col bg-light">
                        <h1>Login</h1>
                        <div class="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <label for="email">Email</label>
                                <input type="email" class="form-control" name="email" required onChange={this.handleChange}/>
                                <label for="senha">Senha</label>
                                <input type="password" class="form-control" name="senha" required onChange={this.handleChange}/>
                                <a class="nav-link" href="/novoUsuario">Criar conta</a>
                                <button class="btn" id="buttongreen" type="submit"  >Entrar</button>
                            </form>
                        </div>
                    </div>
                    }
                    end if

                </div>
            </div>
        )
    }
}
