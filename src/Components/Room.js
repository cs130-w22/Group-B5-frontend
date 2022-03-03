
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Room({socket, openConnection, changeSocket}){
    let params = useParams();
	const classes = useStyles();
	let navigate = useNavigate()
	
	const [opponents, setOpponents] = useState([]);

    // useEffect(()=>{
    //     console.log("Room useEffect socket:", socket)
    // }, [socket])

    useEffect(()=>{
        console.log("Room has mounted: ", socket)
        let sock = socket;
        if(!sock){
            sock = openConnection("private");

            sock.on("connect", () => {
                console.log("Connected to socket server");
                changeSocket(sock)

                sock.on("start", (problem_details)=>{
                    navigate(`/race/${params.lobbyCode}`, { state: {problem: problem_details  }})
                })
        
                sock.on("join", (message, all) => {
                    console.log(message)
                    setOpponents(all)
                })

                sock.on("leave", (message, all) => {
                    console.log(message)
                    setOpponents(all)
                })

                sock.emit('join', params.lobbyCode)
            });
            
            sock.on("disconnect", (reason) => {
                console.log(`Disconnected from socket server for ${reason}`); 
            });
        
            sock.on("connect_error", (e) => {
                console.log(e.message)
                //sock.connect();
            });
        } else {
            //duplicate code
            sock.on("start", (problem_details)=>{
                navigate(`/race/${params.lobbyCode}`, { state: {problem: JSON.parse(problem_details)  }})
            })
    
            sock.on("join", (message, all) => {
                console.log(message)
                setOpponents(all)
            })

            sock.on("leave", (message, all) => {
                console.log(message)
                setOpponents(all)
            })
        }
    }, [])

	let handleStart = () => {
        console.log("Starting game with code", params.lobbyCode)
		socket.emit('start', params.lobbyCode)
	}

    let handleLeave = () => {
        console.log(socket)
        console.log(`Leaving lobby with code ${params.lobbyCode}`)
        socket.emit('leave', params.lobbyCode)
        socket.removeAllListeners();
        navigate("/matchmaking")
    }

    // useEffect(()=>{
    //     return () =>{
    //         console.log("Room unmounting: ", mySocket)
    //         if(mySocket !== null)
    //             mySocket.removeAllListeners();
    //     };
    // }, [])

	return(
	<div className={classes.container}>
		<p className={classes.code}>Private Race: {params.lobbyCode} </p>
        <div style={{display: 'flex'}}>
            <div className={classes.box}>
                <p className={classes.text}>Participants:</p>
                <div style={{height: '250px', overflow: 'scroll'}}>
                    {opponents.map((o, i) => {
                        return <p className={classes.opp} key={i}>{o}</p>
                    })}
                </div>
            </div>
            <div className={classes.box}>
                <button onClick={handleStart} className={classes.button} style={{marginTop: '40px'}}>
                    Start Race
                </button>
                <button onClick={handleLeave} className={classes.button} style={{fontSize: '16px', height: '40px', marginTop: '10px'}}>
                    Leave Room
                </button>
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
        cursor: 'pointer'
    }
}))

