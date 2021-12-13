import React, { Component, useEffect, useState } from 'react'
import './header.css'
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import axios from 'axios'
import globals from '../config/Globals'
const url = process.env.REACT_APP_BASE_API_URL + "users/logout"
let user;
let nome;
if (globals.getUser()) {
    
 user = globals.getUser()
 nome = globals.getUser().nome;
}
console.log(nome)

export default function Header() {
    
    const handleSubmit = event => {
        globals.logoutUser();
        window.location.replace('/login')
      }
          
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">
                            <img src='/images/literacritico-logo.png' alt='logo' />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/tecnologias">Tecnologias</Nav.Link>
                                <Nav.Link href="/desenvolvedor">Desenvolvedor</Nav.Link>
                                <Nav.Link href="/projeto">O projeto</Nav.Link>
                                <Nav.Link href="/contato">Contato</Nav.Link>
                                <Nav.Link href="/listagemLivros">Livros</Nav.Link>
                                {user && 
                                <NavDropdown title="Área do Crítico" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/novoLivro">Novo Livro</NavDropdown.Item>
                                    <NavDropdown.Item href="/novaCritica">Postar Critica</NavDropdown.Item>
                                    <NavDropdown.Item href="/novoCritico">Criar novo perfil de crítico</NavDropdown.Item>
                                </NavDropdown>}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div className="col align-self-end" >
                    {user &&
                        <h6 className="row justify-content-end" id='headerola' >Olá {nome}!</h6>
                    }
                    <div className="row justify-content-end">
                    {user &&
                        
                        <form id="fomr" onSubmit={handleSubmit}>
                        <a className=" row justify-content-end" id='headersmallblue' href="/editarNome" >Editar nome</a>
                            <a className="navbar-brand  row justify-content-end" id='headersmallred'><button className='btn 'id='headersmallred'>Logout</button></a>
                        </form>
                    }
                    {!user &&
                        
                        <a className="navbar-brand  row justify-content-end align-content-center" id='headersmallblue' href="/login" >Login</a>
                    }
                    </div>
                </div>

            </div>
        </nav>
    )
}



