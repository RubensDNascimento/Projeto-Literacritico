import React, { Component } from 'react'

import Markdown from '../../components/markdown/markdown';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Container } from 'react-bootstrap';
import projetomd from '../../components/markdown/md/texto-projeto.md';

export default class projeto extends Component {
    render() {
        return (
            <div>
                <Header />
                <Container>
                    <div class="card bg-light">
                        <div class="card-body">
                            <Markdown path={projetomd} />
                        </div>
                    </div>
                </Container>
                <Footer />
            </div>
        )
    }
}
