import React from 'react';
import Rotas from './config/Rotas'
import { Home, Cadastro, CadastroCritico, EditarNome } from './views/'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-bootstrap';
import axios from 'axios';
import globals  from './config/Globals';


function App() {
  axios.interceptors.request.use(async(config)=>{
    const token = globals.getToken();
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    console.log(error);
    return Promise.reject(error);
  });
  return (
    <Rotas/>
    
  );
}

export default App;
