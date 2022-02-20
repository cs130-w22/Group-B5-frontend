import Lobbymaking from '../Components/Lobbymaking'
import Room from '../Components/Room'
import { Routes, Route } from "react-router-dom";
import { makeStyles } from '@mui/styles';

function Matchmaking(props) {

    return (      
        <Routes>
            <Route path="/:lobbyCode" element={<Room {...props} />} />
            <Route exact path="/" element={<Lobbymaking {...props}/>} />
        </Routes>     

    )
}

export default Matchmaking;
