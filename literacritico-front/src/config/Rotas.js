import React from 'react';
import { Home, Cadastro, CadastroCritico, EditarNome, NovoLivro, EditarLivro, ListagemLivros, Desenvolvedor, Ferramentas, Projeto, Contato } from '../views'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App'

const Rotas = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route exact path="/novoUsuario" element={<Cadastro />} />
                <Route exact path="/novoCritico" element={<CadastroCritico />} />
                <Route exact path="/editarNome" element={<EditarNome />} />
                <Route exact path="/novoLivro" element={<NovoLivro />} />
                <Route exact path="/editarLivro" element={<EditarLivro />} />
                <Route exact path="/listagemLivros" element={<ListagemLivros />} />
                <Route exact path="/desenvolvedor" element={<Desenvolvedor />} />
                <Route exact path="/tecnologias" element={<Ferramentas />} />
                <Route exact path="/projeto" element={<Projeto />} />
                <Route exact path="/contato" element={<Contato />} />
            </Routes>
        </Router>
    );
};


export default Rotas;