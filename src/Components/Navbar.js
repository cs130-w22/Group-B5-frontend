import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom'
import { useAuth } from '../config'
import logo from '../assets/Leetracer_plain.png'

function Navbar(props){
    const classes = useStyles();
    const {user} = useAuth();
    if(user){
        return (
            <div className={classes.nav}>
                <div className={classes.leftBox}>
                    <img src={logo} className={classes.img} />
                    <Link to="/" className={classes.title}>Leetracer</Link>
                </div>
                <div className={classes.rightBox}>
                    <Link to="/matchmaking" className={classes.item} style={{ marginRight: '.7rem' }}>Compete</Link>
                    <Link to="/profile" className={classes.button}>My Profile</Link>
                </div>
            </div>
        ) 
    } else {
        return (
            <div className={classes.nav}>
                <div className={classes.leftBox}>
                    <img src={logo} className={classes.img} />
                    <Link to="/" className={classes.title}>Leetracer</Link>
                </div>
                <div className={classes.rightBox}>
                    <Link to="/matchmaking" className={classes.item} style={{ marginRight: '.7rem' }}>Compete</Link>
                    <Link to="/signup" className={classes.button}>Sign Up</Link>
                </div>
            </div>
        ) 
    }
    
}

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
        marginLeft: '50px',
        display: 'flex',
        alignItems: 'center'
    },
    img: {
        height: '50px',
        margin: '0'
    },
    rightBox: {
        width: '350px',
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

export default Navbar;