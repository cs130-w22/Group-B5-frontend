import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom'


function Header(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.item}>
                <h1 className={classes.title}>A new way to improve interview skills</h1>
                <p className={classes.body}>Compete against others to raise the stakes and get better at solving interview questions under pressure</p>
                <Link to='/signup'>
                    <button className={classes.button}>Make an Account</button>
                </Link>
            </div>
            <div className={classes.item}>
                <img src='https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png'/>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        height: '600px',
        margin: 'auto auto auto auto',
        padding: '40px',
        backgroundColor: 'gainsboro',
        display: 'flex',
        justifyContent: 'space-around',
    },
    item: {
        width: '40%',
    },
    title: {
        fontSize: '50px',
        color: 'black',
        textAlign: 'left',
    },
    body: {
        fontSize: '22px',
        color: 'gray',
        textAlign: 'left',
    },
    button: {
        width: '320px',
        height: '80px',
        borderRadius: "20em",
        color: 'white',
        backgroundColor: 'black',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '22px',
        fontWeight: 'medium',
        cursor: 'pointer',
    },
}))

export default Header;
