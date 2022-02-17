import Header from '../Components/Header'
import Lobbymaking from '../Components/Lobbymaking'
import { makeStyles } from '@mui/styles';

function Matchmaking(props) {

    return (           
        <Lobbymaking />

    )
}

export default Matchmaking;

const useStyles = makeStyles(theme => ({ 
    nav: {
        width: '100%',
        height: '65px',
        margin: '0px',
        padding: '10px 20px',
        boxSizing: 'border-box',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    item: {
        color: '#3b4653',
        textDecoration: 'none',
        cursor: 'pointer',
        fontWeight: 'bold'
    },
    leftBox: {
        marginLeft: '50px'
    },
    rightBox: {
        width: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: '50px'
    },
    title: {
        color: 'black',
        margin: 0,
        fontSize: '26px',
        letterSpacing: '1px',
        textDecoration: 'none',
    },
    button: {
        color: 'white',
        backgroundColor: '#28313c',
        textDecoration: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box',
        borderRadius: '3px',
        width: '110px',
        height: '35px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    }
}))
