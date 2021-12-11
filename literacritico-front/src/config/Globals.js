import React from 'react';
class Globals {
    login = (user, token) =>{
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        console.log(user)
    }
    setUser = (user) =>{
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user)
    }
    
    getUser=()=>{
        const user = localStorage.getItem("user");
        if (user) {
            return JSON.parse(user);
        }
    }

    logoutUser = ()=>{
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
}
const globals = new Globals();
export default globals