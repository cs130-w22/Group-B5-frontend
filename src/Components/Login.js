import { useState } from 'react'
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { API_URL } from '../config'
import axios from 'axios';

function Login(props){
    const classes = useStyles();
    const [username, changeUsername] = useState("")
    const [password, changePassword] = useState("")
    const [usernameError, changeUsernameError] = useState(false)
    const [passwordError, changePasswordError] = useState(false)
    const [loginError, changeLoginError] = useState(false)
    
    let handleSubmit = async (e) => {
        e.preventDefault()
        let set1, set2 = false
        
        if(username.length === 0){
            changeUsernameError(true);
            set1 = true;
        } 
        if(password.length === 0){ 
            changePasswordError(true)
            set2 = true
        }
        if(set1 || set2) return;

        changeUsernameError(false)
        changePasswordError(false)

        //make API request
        let res = await axios.post(`${API_URL}/login`, {username, password})
        
        if(!res || res.status != 200){
            changeLoginError(true);
            return;
        }

        let {jwt} = res.data
        
        axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
        document.cookie = `jwt=${jwt}`  
    }

    return (
        <Card className={classes.container} variant="outlined">
            <CardContent>
                <h3 className={classes.title}>Login to Leetracer</h3>
                <form className={classes.form} onSubmit={handleSubmit}>
                <label className={classes.inputLabel}>Username</label>
                <input type="text" value={username} className={classes.input}
                    onChange={(e)=>{changeUsername(e.target.value)}} />
                <p className={classes.required} style={usernameError===true ? {visibility: 'visible'} : {visibility: 'hidden'}}>Required</p>
                <label className={classes.inputLabel}>Password</label>
                <input type="password" value={password} className={classes.input}
                    onChange={(e)=>{changePassword(e.target.value)}} />
                <p className={classes.required} style={passwordError===true ? {visibility: 'visible'} : {visibility: 'hidden'}}>Required</p>
                <button type="submit" className={classes.submitButton}> Login </button>
                <p className={classes.loginError} style={loginError===true ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                    There was an error logging in. Please try again
                </p>
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
        marginTop: '12px',
        cursor: 'pointer'
    },
    required: {
        margin: '2px auto 5px 0px',
        fontSize: '12px',
        color: 'red'
    },
    inputLabel: {
        display: 'block',
        fontSize: '15px',
        marginBottom: '3px',
        marginTop: '12px'
    },
    loginError: {
        padding: '10px',
        width: '100%',
        fontSize: '13px',
        color: 'red',
        boxSizing: 'border-box',
        display: 'block',
        border: '1px solid red',
        borderRadius: '5px'
    }
}))

export default Login;

