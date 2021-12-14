import React, { Component } from 'react'

import Markdown from '../../components/markdown/markdown';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Container } from 'react-bootstrap';
import desenvolvedormd from '../../components/markdown/md/texto-desenvolvedor.md';

export default class desenvolvedor extends Component {
    render() {
        return (
            <div>
                <Header />
                <Container>
                    <div class="card bg-light">
                        <div class="card-body">
                            <Markdown path={desenvolvedormd} />
                        </div>
                    </div>
                </Container>
                <Footer />
            </div>
        )
    }
}
