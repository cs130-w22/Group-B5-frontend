import axios from 'axios';
import React, {useState, useContext, useEffect, useMemo} from 'react'
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080"

const userContext = React.createContext({});

let AuthProvider = (props) => {
    let navigate = useNavigate()
    const [user, setUser] = useState(undefined)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [loadingInitial, setLoadingInitial] = useState(false);

    //check for valid user session when app mounts
    useEffect(async () => {
        let token = localStorage.getItem('token')
        let username = localStorage.getItem('username')

        if(!token || !username){ setLoadingInitial(false); return};
        let res = await axios.post(`${API_URL}/auth/verify`, {token, username})
        if(res.data.verified){
            console.log("Confirmed existing user session")
            setUser({token, username});
            //navigate('/protected')
        } 
        setLoadingInitial(false)
      }, []);

    async function login(username, password) {
        setLoading(true);
        
        try {
            let res = await axios.post(`${API_URL}/auth/login`, {username, password})
            if(res.status !== 200) throw new Error();
        
            let {token} = res.data
            axios.defaults.headers.common.Authorization = `Bearer ${token}`

            localStorage.setItem('token', token)
            localStorage.setItem('username', username)
            setUser({token, username});
        
            setError(false)
            navigate('/protected')
        } catch(e){
            setError(true)
        }
        setLoading(false)
    }

    async function signUp(username, password) {
        setLoading(true);
        
        try {
            let res = await axios.post(`${API_URL}/auth/signup`, {username, password})
            if(res.status !== 201) throw new Error();

            let {token} = res.data
            axios.defaults.headers.common.Authorization = `Bearer ${token}`

            localStorage.setItem('token', token)
            localStorage.setItem('username', username)
            setUser({token, username});
        
            setError(false)
            navigate('/protected')
        } catch(e){
            setError(true)
        }
        setLoading(false)
    }

    function logout() {
        setUser(undefined);
    }

    const memoedValue = useMemo(
        () => ({
          user,
          loading,
          error,
          login,
          signUp,
          logout,
        }),
        [user, loading, error]
    );

    return (
        <userContext.Provider value={memoedValue}>
          {!loadingInitial && props.children}
        </userContext.Provider>
      );
}

let useAuth = () => {
    return useContext(userContext)
}


export {API_URL, userContext, AuthProvider, useAuth }