import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom'

function Navbar(props){
    const classes = useStyles();
    
    return (
        <div className={classes.nav}>
            <p style={{'visibility': 'hidden'}}>Login</p>
            <Link to="/" className={classes.title}>Leetracer</Link>
            <div>
            <Link to="/signup" className={classes.item} style={{ marginRight: '.7rem' }}>Sign Up</Link>
            <Link to="/login" className={classes.item}>Login</Link>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({ 
    nav: {
        width: '100%',
        height: '60px',
        margin: '0px',
        padding: '10px 20px',
        boxSizing: 'border-box',
        backgroundColor: '#007000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    item: {
        color: 'white',
        textDecoration: 'none',
        cursor: 'pointer'
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '40px',
        letterSpacing: '1px',
        textDecoration: 'none',
    }
}))

export default Navbar;