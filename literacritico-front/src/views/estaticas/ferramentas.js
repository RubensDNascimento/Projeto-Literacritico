import React, { Component } from 'react'

import Markdown from '../../components/markdown/markdown';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ferramentasrmd from '../../components/markdown/md/texto-ferramentas.md';
import '../../index.css'

export default class ferramentas extends Component {
    render() {
        return (
            <div>
                <Header />
                <div class="card bg-light">
                    <div class="card-body">
                        <Markdown path={ferramentasrmd} />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
