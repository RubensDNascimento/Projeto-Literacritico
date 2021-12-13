import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../index.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom'
const url = process.env.REACT_APP_BASE_API_URL + "admin/editarLivro/"
let urlCapa = process.env.REACT_APP_BASE_API_URL

const data = new FormData()
function EditarLivro() {

    const navigate = useNavigate()
    const { id } = useParams()

    const [livro, setLivro] = useState({
        titulo: '',
        autor: '',
        ano: 0,
        sinopse: '',
        capa: {}
    });
    const [capaAtual, setCapaAtual] = useState('')
    const [erros] = useState([])
    const [redirect, setRedirect] = useState(false)


    console.log(id)
    console.log(livro.titulo)

    useEffect(()=>{
        axios.get(url + id).then(res => {
            console.log("Livro" + res.data.livro.book.titulo)
            setLivro(res.data.livro.book)
            setCapaAtual(res.data.livro.book.capa)
            console.log("Livro2: " + livro.titulo)
            console.log("Erros: "+erros)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    console.log("Capa Livro: " + livro.capa)
    console.log("CapaAtual: " + capaAtual)


    function handleChange(event){
        console.log(event.target.value)
        console.log(livro.titulo)
        console.log(livro)
        const value = event.target.value;
        setLivro({ ...livro, [event.target.name]: value });
        console.log(livro.titulo)
      }
      function imageHandle(event) {
        setLivro({ ...livro, capa: event.target.files[0]})
        console.log(typeof event.target.files[0])
      }
      function handleSubmit(event) {
        event.preventDefault();
        erros.splice(0, erros.length)
        data.append("id", id)
        data.append("titulo", livro.titulo)
        data.append("autor", livro.autor)
        console.log("Autor State: " + livro.autor)
        console.log("Autor Data: " + data.autor)
        data.append("ano", livro.ano)
        data.append("sinopse", livro.sinopse)
        data.append("capa", livro.capa)
        if (!livro.capa) {
            data.append("capaAtual", capaAtual)
        }
        const config = {
            headers:{
                'content-type': 'multipart/form-data',
            },
        }
        for (var key of data.entries()) {
            console.log(key[0] + ": "+key[1]);
        }
        console.log(data)
    
        axios.post( url, data, config).then((res)=>{
            console.log("Status: "+res.data.status)
            console.log("msg: "+res.data.msg)
            setRedirect(true)
                
            }).catch((err)=>{
                console.log("Erros: "+erros)
                console.log(Object.entries(err.response.data.msg))
                Object.entries(err.response.data.msg).forEach(([key, value]) => {
                    erros.push(value.texto)
                });
                
                console.log("Erros: "+erros)
                setLivro({...livro, titulo:''})
                setLivro({...livro, autor:''})
                setLivro({...livro, ano:0})
                setLivro({...livro, sinpse:''})
                setLivro({...livro, capa:{}})
                console.log("tate: "+livro.titulo)
                data.delete("titulo")
                data.delete("autor")
                data.delete("ano")
                data.delete("sinopse")
                data.delete("capa")
            })
      }

    return (
        <div>
            {redirect && navigate("/listagemLivros")}

            <Header />

            <div class="card bg-light">
                <div class="card-body">
                    {erros.map(erro => {
                        return <div class="alert alert-danger">{erro}</div>
                    })
                    }
                    <h1 id="logocentral">Editar livro</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="id" value={id} />
                        <label for="titulo">Título:</label>
                        <input type="text" name="titulo" class="form-control" value={livro.titulo} onChange={handleChange} required />
                        <label for="autor">Autor:</label>
                        <input type="text" name="autor" class="form-control" value={livro.autor} onChange={handleChange} required />
                        <label for="ano">Ano de publicação:</label>
                        <input type="number" step="1" name="ano" class="form-control" value={livro.ano} onChange={handleChange} required />
                        <label for="sinopse">Sinopse:</label>
                        <textarea name="sinopse" class="form-control" value={livro.sinopse} onChange={handleChange} required> </textarea>
                        <div class=" row align-items-start">
                            <div class="col-8">
                                <label for="capa">Capa:</label>
                                <input type="file" class="form-control" id="inputGroupFile03" name="capa" accept="image/png, image/jpeg"  onChange={imageHandle} />
                                <input type="hidden" name="capaAtual" value={capaAtual} />
                                <button type="submit" class="btn " id='buttongreen'>Editar Livro</button>
                            </div>
                            <div class="col-2" >
                                <label for="capa">Capa atual: </label>
                                <img src={urlCapa + capaAtual} width="150px" class="img-responsive" alt={'Capa do ' + livro.titulo } />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default EditarLivro
