import React from 'react';
import { Home, Cadastro, CadastroCritico, EditarNome, NovoLivro, EditarLivro, ListagemLivros, Desenvolvedor, Ferramentas, Projeto, Contato, NovaCritica, EditarCritica, Critica, Login, CriticasPorLivro } from '../views'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App'

const Rotas = () => {
    return (
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route exact path="/novoUsuario" element={<Cadastro />} />
                <Route exact path="/novoCritico" element={<CadastroCritico />} />
                <Route exact path="/editarNome" element={<EditarNome />} />
                <Route exact path="/novoLivro" element={<NovoLivro />} />
                <Route exact path="/editarLivro/:id" element={<EditarLivro />} />
                <Route exact path="/listagemLivros" element={<ListagemLivros />} />
                <Route exact path="/desenvolvedor" element={<Desenvolvedor />} />
                <Route exact path="/tecnologias" element={<Ferramentas />} />
                <Route exact path="/projeto" element={<Projeto />} />
                <Route exact path="/contato" element={<Contato />} />
                <Route exact path="/novaCritica" element={<NovaCritica />} />
                <Route exact path="/editarCritica/:id" element={<EditarCritica />} />
                <Route exact path="/critica/:id" element={<Critica />} />
                <Route exact path="/criticasPorLivro/:id" element={<CriticasPorLivro />} />
            </Routes>
    );
};


export default Rotas;