import { Navigate, Route} from "react-router-dom";
import React from 'react'
import { useAuth } from '../config'

function Protected({children}){
    const info = useAuth();
    console.log(info)
    if (!info.user) {
        return <Navigate to="/login" replace />;
    }
    
    return children; 
}

export default Protected;