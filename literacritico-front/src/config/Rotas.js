import React, { Component } from 'react';
import { Home, Cadastro, CadastroCritico, EditarNome, NovoLivro, EditarLivro, ListagemLivros, Desenvolvedor, Ferramentas, Projeto, Contato, NovaCritica, EditarCritica, Critica, Login, CriticasPorLivro } from '../views'
import { Route, Router, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import globals from './Globals';


const RotaPrivada = () => {
    const location = useLocation()
    if (globals.estaLogado()) {
        return <Outlet />
    } else {
        return <Navigate to='/login' state={{ from: location, msg: "Você precisa estar logado para navegar até essa pagina" }} />
    }
}
const RotaPrivadaCritico = () => {
    const location = useLocation()
    if (globals.eCritico()) {
        return <Outlet />
    } else {
        if (globals.estaLogado()) {
            return <Navigate to='/' state={{ from: location, msg: "Você precisa ser um critico para navegar até essa pagina" }} />
        } else {
            return <Navigate to='/login' state={{ from: location, msg: "Você precisa estar logado e ser um critico para navegar até essa pagina" }} />
        }
    }
}
const RotaPrivadaNaoLogado = () => {
    const location = useLocation()
    if (!globals.estaLogado()) {
        return <Outlet />
    } else {
        return <Navigate to='/' state={{ from: location, msg: "Você já esta logado" }} />
    }
}
const Rotas = () => {
    return (
        <Routes >
            <Route path="/" element={<Home />} />
            <Route exact path="/login" element={<RotaPrivadaNaoLogado />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route exact path="/novoUsuario" element={<Cadastro />} />
            <Route exact path="/novoCritico" element={<RotaPrivadaCritico />}>
                <Route exact path="/novoCritico" element={<CadastroCritico />} />
            </Route>
            <Route exact path="/editarNome" element={<RotaPrivada />} >
                <Route exact path="/editarNome" element={<EditarNome />} />
            </Route>
            <Route exact path="/novoLivro" element={<RotaPrivadaCritico />}>
                <Route exact path="/novoLivro" element={<NovoLivro />} />
            </Route>
            <Route exact path="/editarLivro/:id" element={<RotaPrivadaCritico />}>
                <Route exact path="/editarLivro/:id" element={<EditarLivro />} />
            </Route>
            <Route exact path="/listagemLivros" element={<RotaPrivada />}>
                <Route exact path="/listagemLivros" element={<ListagemLivros />} />
            </Route>
            <Route exact path="/desenvolvedor" element={<Desenvolvedor />} />
            <Route exact path="/tecnologias" element={<Ferramentas />} />
            <Route exact path="/projeto" element={<Projeto />} />
            <Route exact path="/contato" element={<Contato />} />
            <Route exact path="/novaCritica" element={<RotaPrivadaCritico />}>
                <Route exact path="/novaCritica" element={<NovaCritica />} />
            </Route>
            <Route exact path="/editarCritica/:id" element={<RotaPrivadaCritico />}>
                <Route exact path="/editarCritica/:id" element={<EditarCritica />} />
            </Route>
            <Route exact path="/critica/:id" element={<RotaPrivada />}>
                <Route exact path="/critica/:id" element={<Critica />} />
            </Route>
            <Route exact path="/criticasPorLivro/:id" element={<RotaPrivada />}>
                <Route exact path="/criticasPorLivro/:id" element={<CriticasPorLivro />} />
            </Route>
        </Routes>
    );
};


export default Rotas;