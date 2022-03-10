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
                <img className={classes.img} 
                src='https://akm-img-a-in.tosshub.com/indiatoday/images/story/202012/chris-ried-ieic5Tq8YMk-unsplas_1200x768.jpeg?bEhcYQAShJnLf0Mtu4JYq8YzICfhz2rB&size=770:433'/>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        height: '600px',
        margin: 'auto auto auto auto',
        padding: '40px',
        backgroundColor: '#eef1f4',
        display: 'flex',
        justifyContent: 'space-around',
    },
    img: {
        height: '350px',
        marginTop: '70px',
        borderRadius: '7px'
    },
    item: {
        width: '40%',
    },
    title: {
        fontSize: '50px',
        color: '#3b4653',
        textAlign: 'left',
    },
    body: {
        fontSize: '22px',
        color: '#7b8fa4',
        textAlign: 'left',
    },
    button: {
        width: '320px',
        height: '80px',
        border: '0px',
        borderRadius: "20em",
        color: 'white',
        backgroundColor: '#29313c',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '24px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px'
    },
}))

export default Header;
