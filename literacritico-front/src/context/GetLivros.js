import React from 'react';
import axios from 'axios';
const url = process.env.REACT_APP_BASE_API_URL + "admin/livros"

const GetLivros = () => {
    return (
        axios.get(url).then(res=>{
            return res.data.livros.books
        })
    )}


export default GetLivros;