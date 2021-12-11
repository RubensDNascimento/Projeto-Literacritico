import React, { Component, useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import Feed from '../../components/Feed'
import { Container, Row, Col } from 'react-bootstrap'

import axios from 'axios';
const url = process.env.REACT_APP_BASE_API_URL+"users/logado"

export default class index extends Component {

render() {
    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col xs lg="2"><Sidebar /></Col>
                    <Col><Feed /></Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}
}
