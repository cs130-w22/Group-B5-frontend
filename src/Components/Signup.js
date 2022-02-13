import { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { useAuth } from '../config'
import { Link } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function Signup(props){
    const { signUp, error } = useAuth();
    const classes = useStyles();
    const [username, changeUsername] = useState("")
    const [password, changePassword] = useState("")
    const [usernameError, changeUsernameError] = useState(false)
    const [passwordError, changePasswordError] = useState(false)
    
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

       signUp(username, password)
    }

    return (
        <Card className={classes.container} variant="outlined">
            <CardContent>
                <h3 className={classes.title}>Create a Leetracer Account</h3>
                <form className={classes.form} onSubmit={handleSubmit}>
                <label className={classes.inputLabel}>Username</label>
                <input type="text" value={username} className={classes.input}
                    onChange={(e)=>{changeUsername(e.target.value)}} />
                <p className={classes.required} style={usernameError===true ? {visibility: 'visible'} : {visibility: 'hidden'}}>Required</p>
                <label className={classes.inputLabel}>Password</label>
                <input type="password" value={password} className={classes.input}
                    onChange={(e)=>{changePassword(e.target.value)}} />
                <p className={classes.required} style={passwordError===true ? {visibility: 'visible'} : {visibility: 'hidden'}}>Required</p>
                <button type="submit" className={classes.submitButton}> Create Account </button>
                <p className={classes.redirect}>Already have an account? <Link to="/login">Login</Link></p>
                <p className={classes.signupError} style={error===true ? {visibility: 'visible'} : {visibility: 'hidden'}}>
                    There was an error creating an account. Please try again
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
        backgroundColor: '#28313c',
        color: 'white',
        border: 'none',
        padding: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        boxSizing: 'border-box',
        margin: '7px auto 0px auto',
        borderRadius: '3px',
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
    signupError: {
        padding: '10px',
        width: '100%',
        fontSize: '13px',
        color: 'red',
        boxSizing: 'border-box',
        display: 'block',
        border: '1px solid red',
        borderRadius: '5px',
        marginBottom: '0'
    },
    redirect: {
        margin: '10px 0px',
        fontSize: '15px'
    }
}))

export default Signup;

