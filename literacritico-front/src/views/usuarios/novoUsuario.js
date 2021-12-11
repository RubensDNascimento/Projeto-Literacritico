import React, { Component, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import axios from 'axios';
import globals from '../../config/Globals'
import { useNavigate } from 'react-router-dom'
const url = process.env.REACT_APP_BASE_API_URL+"users/register"

const NovoUsuario =()=> {
      const [state, setState]= useState({
        nome:'',
        email:'',
        senha: '',
        eCritico: 0
      });
      const navigate = useNavigate();
      

      function handleChange(evt) {
        const value = evt.target.value;
        setState({
          ...state,
          [evt.target.name]: value
        });
      }
      function handleSubmit() {
    
        axios.post( url, {
            nome: state.nome,
            email: state.email,
            senha: state.senha,
            senha2: state.senha2,
            eCritico: state.eCritico })
            .then(res=>{
                console.log(res.data.user)
                console.log("res.data.user")
                navigate('/')
            })
      }
      
        return (
            <div>
            <Header />

            <div class="card bg-light">
                    <div class="card-body" >
                        <h1 id="logocentral">Criar sua conta</h1>
                        <form onSubmit={handleSubmit}>
                            <label for="nome">Nome:</label>
                            <input type="text" name="nome" class="form-control" onChange={handleChange} required  />
                            <label for="email">Email:</label>
                            <input type="email" name="email" class="form-control" onChange={handleChange} required />
                            <label for="senha">Senha:</label>
                            <input type="password" name="senha" class="form-control" onChange={handleChange} required />
                            <label for="senha2">Digite a senha novamente:</label>
                            <input type="password" name="senha2" class="form-control"onChange={handleChange} required />
                            <button type="submit" class="btn" id='buttongreen'>Criar conta</button>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

export default NovoUsuario