import React from 'react';
import Rotas from './config/Rotas'
import { Home, Cadastro, CadastroCritico, EditarNome } from './views/'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'react-bootstrap';


function App() {
  return (
    <Rotas/>
    
  );
}

export default App;
