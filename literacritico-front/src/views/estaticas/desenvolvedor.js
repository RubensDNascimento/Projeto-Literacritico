import React, { Component } from 'react'

import Markdown from '../../components/markdown/markdown';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import desenvolvedormd from '../../components/markdown/md/texto-desenvolvedor.md';

export default class desenvolvedor extends Component {
    render() {
        return (
            <div>
                <Header />
                <div class="card bg-light">
                    <div class="card-body">
                        <Markdown path={desenvolvedormd} />
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
