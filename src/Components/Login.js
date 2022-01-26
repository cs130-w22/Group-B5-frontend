import {
    useState
} from 'react'
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Login(props){
    const classes = useStyles();
    const [username, changeUsername] = useState("")
    const [password, changePassword] = useState("")
    const [usernameError, changeUsernameError] = useState(false)
    const [passwordError, changePasswordError] = useState(false)
    
    let handleSubmit = (e) => {
        e.preventDefault()
        changeUsernameError(false)
        changePasswordError(false)
        if(username.length === 0) changeUsernameError(true)
        if(password.length === 0) changePasswordError(true)
        if(usernameError || passwordError) return;

        //make API request
    }

    return (
        <Card className={classes.container} variant="outlined">
            <CardContent>
                <h3 className={classes.title}>Login to Leetracer</h3>
                <form className={classes.form} onClick={handleSubmit}>
                <label className={classes.inputLabel}>Username</label>
                <input type="text" value={username} className={classes.input}
                    onChange={(e)=>{changeUsername(e.target.value)}} />
                <p className={classes.required} style={usernameError===true ? {visibility: 'visible'} : {visibility: 'hidden'}}>Required</p>
                <label className={classes.inputLabel}>Password</label>
                <input type="password" value={password} className={classes.input}
                    onChange={(e)=>{changePassword(e.target.value)}} />
                <p className={classes.required} style={passwordError===true ? {visibility: 'visible'} : {visibility: 'hidden'}}>Required</p>
                <button type="submit" className={classes.submitButton}> Login </button>
                </form>
            </CardContent>
        </Card>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        width: '400px',
        height: '420px',
        margin: '100px auto auto auto'
    },
    form: {
        display: 'grid',
        padding: '0 5%',
    },
    title: {
        fontSize: '25px',
        textAlign: 'center'
    },
    input: {
        padding: '10px',
        width: '100%',
        fontSize: '14px',
        
        boxSizing: 'border-box',
        display: 'block'
    },
    submitButton: {
        width: '100%',
        padding: '10px',
        fontSize: '14px',
        boxSizing: 'border-box',
        display: 'block',
        marginTop: '20px',
        cursor: 'pointer'
    },
    required: {
        margin: '2px auto 10px 0px',
        fontSize: '12px',
        color: 'red'
    },
    inputLabel: {
        display: 'block',
        fontSize: '15px',
        marginBottom: '3px',
        marginTop: '16px'
    }
}))

export default Login;

