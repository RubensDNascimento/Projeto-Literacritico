import React from 'react';
class Globals {
    login = (user, token) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        console.log(user)
    }
    setUser = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user)
    }

    getUser = () => {
        const user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }
    }

    logoutUser = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
    getToken=()=>{
        const token = localStorage.getItem("token")
        if (this.estaLogado) {
            return JSON.parse(token);
        }
    }
    estaLogado = () => {
        const token = localStorage.getItem("token")
        console.log(token);
        const user = localStorage.getItem("user")
        if (token && user) {
            return true
        } 
    }
    eCritico = () => {
        if (this.estaLogado()) {
            if (this.getUser().eCritico === 1) {
                return true
            } 
        }
    }
}
const globals = new Globals();
export default globals