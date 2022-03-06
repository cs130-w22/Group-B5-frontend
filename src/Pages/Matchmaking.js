import Lobbymaking from '../Components/Lobbymaking'
import Room from '../Components/Room'
import { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import { makeStyles } from '@mui/styles';

function Matchmaking(props) {
    useEffect(()=>{
        console.log(props)
    }, [props])
    
    return (      
        <Routes>
            <Route path="/:lobbyCode" element={<Room {...props} />} />
            <Route exact path="/" element={<Lobbymaking {...props}/>} />
        </Routes>     

    )
}

export default Matchmaking;
