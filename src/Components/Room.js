
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Room({socket, openConnection, changeSocket}){
    let params = useParams();
	const classes = useStyles();
	let navigate = useNavigate()
	
	const [opponents, setOpponents] = useState([]);

    useEffect(()=>{
        let sock = socket;
        if(!sock){
            sock = openConnection("private");

            sock.on("connect", () => {
                console.log("Connected to socket server");
                changeSocket(socket)

                sock.on("start", ()=>{
                    navigate("/race")
                })
        
                sock.on("join", (message, newUser) => {
                    setOpponents((prev) => [...prev, newUser])
                })

                sock.emit('join', params.lobbyCode)
            });
            
            sock.on("disconnect", () => {
                console.log("Disconnected from socket server"); 
            });
        
            sock.on("connect_error", (e) => {
                console.log(e.message)
                //sock.connect();
            });
        } else {
            //duplicate code
            sock.on("start", ()=>{
                navigate("/race")
            })
    
            sock.on("join", (message, newUser) => {
                console.log(`${newUser} join the lobby`)
                setOpponents((prev) => [...prev, newUser])
            })
        }
    }, [])

	let handleStart = () => {
        console.log("Starting game with code", params.lobbyCode)
		socket.emit('start', params.lobbyCode)
	}

    useEffect(()=>{
        return () =>{
            socket.removeAllListeners();
        };
    }, [])

	return(
	<div className={classes.container}>
		<p className={classes.code}>Private Race: {params.lobbyCode} </p>
        <div style={{display: 'flex'}}>
            <div className={classes.box}>
                <p className={classes.text}>Opponents:</p>
                <div style={{height: '250px', overflow: 'scroll'}}>
                    {opponents.map((o, i) => {
                        return <p className={classes.opp} key={i}>{o}</p>
                    })}
                </div>
            </div>
            <div className={classes.box}>
                <button onClick={handleStart} className={classes.button}>Start Race</button>
            </div>
        </div>
	</div>


	)
}

export default Room;

const useStyles = makeStyles(theme => ({ 
    container: {
       width: '500px',
       height: '350px',
       borderRadius: '15px',
       margin: '100px auto 0px auto',
       border: 'none',
       backgroundColor: '#eef1f4',
       display: 'flex',
       flexDirection: 'column',
    },
    box: {
        width: '50%',
        padding: '10px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }, 
    opp: {
        margin: '5px',
        fontSize: '16px'
    },
    text: {
        fontSize: '19px',
        fontWeight: 'bold'
    },
    code: {
        height: '40px',
        fontSize: '25px',
        textAlign: 'center',
        margin: '14px 0px 0px 4px',
        boxSizing: 'border-box',
        borderBottom: '3px solid black'
    },
    button: {
        border: 'none',
        height: '70px',
        width: '180px',
        borderRadius: '10px',
        fontSize: '24px',
        fontWeight: 'bold',
        backgroundColor: '#28313c',
        color: 'white',
        margin: '35% auto',
        cursor: 'pointer'
    }
}))

