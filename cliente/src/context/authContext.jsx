import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser]= useState(JSON.parse(localStorage.getItem("user")) || null)
    const [showUserEdit, setShowUserEdit] = useState(true);

    const login = async (inputs)=>{
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs, { withCredentials: true });
        setCurrentUser(res.data)
    };

    const logout = async ()=>{
        await axios.post("http://localhost:8800/api/auth/logout", null, { withCredentials: true } );
        setCurrentUser(null)
    };

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser))
    },[currentUser]);

    return(
        <AuthContext.Provider value={{currentUser, login, logout, showUserEdit, setShowUserEdit}}>
            {children}
        </AuthContext.Provider>
    )
}