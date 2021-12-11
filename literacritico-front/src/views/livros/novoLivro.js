import React, { Component } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import axios from 'axios';
const url = process.env.REACT_APP_BASE_API_URL+"admin/novoLivro"

const data = new FormData()
export default class novoCritico extends Component {

    state = {
        titulo:'',
        autor:'',
        ano: 0,
        sinopse: '',
        capa: {

        }
      }

      handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state)
      }
      imageHandle = (event) => {
        this.setState({capa: event.target.files[0]})
        data.append("capa", event.target.files[0])
        console.log(typeof event.target.files[0])
      }
      handleSubmit = event => {
        event.preventDefault();
        data.append("titulo", this.state.titulo)
        data.append("autor", this.state.autor)
        data.append("ano", this.state.ano)
        data.append("sinopse", this.state.sinopse)
        const config = {
            headers:{
                'content-type': 'multipart/form-data',
            },
        }
        for (var key of data.entries()) {
            console.log(key[0]);
        }
        console.log(data)
    
        axios.post( url, data).then((res)=>{
                alert('OK')
                
            })
      }

    render() {
        return (
            <div>
                <Header />

                <div class="card bg-light">
                    <div class="card-body">
                        <h1 id="logocentral">Novo livro</h1>
                        <form onSubmit={this.handleSubmit} method="POST" enctype="multipart/form-data">
                            <label for="titulo">Título:</label>
                            <input type="text" name="titulo" class="form-control" onChange={this.handleChange} required/>
                                <label for="autor">Autor:</label>
                                <input type="text" name="autor" class="form-control" onChange={this.handleChange} required/>
                                    <label for="ano">Ano de publicação:</label>
                                    <input type="number" step="1" name="ano" class="form-control" onChange={this.handleChange} required/>
                                        <label for="sinopse">Sinopse:</label>
                                        <textarea name="sinopse" class="form-control" onChange={this.handleChange}></textarea>
                                        <label for="capa">Capa:</label>
                                        <input type="file" class="form-control" id="inputGroupFile02" name="capa" accept="image/png, image/jpeg"  onChange={this.imageHandle}/>
                                            <button type="submit" class="btn" id='buttongreen'>Novo Livro</button>

                                        </form>
                                    </div>
                                </div>
                                <Footer />
                            </div>
                            )
    }
}
