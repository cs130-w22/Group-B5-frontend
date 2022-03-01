
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Lobbymaking({openConnection, changeSocket, socket}){
	const classes = useStyles();
	let navigate = useNavigate()
	
	const [diff, setDiff] = useState('Easy');
	const [type, setType] = useState('random');
	const [code, setCodeSearch] = useState(null)
	const [waiting, setWaiting] = useState(false)
	const [lobbyCode, setCode] = useState("")

	const handleType = (event, newType) => {
	    setType(newType);
	};

	const handleDiff = (event, newDiff) => {
	    setDiff(newDiff);
	};

	let handleJoin = () => {
		navigate(`/matchmaking/${lobbyCode}`)
	}

	let handleMatchmaking = () => {
		let socket = openConnection(type);

		socket.on("connect", () => {
			console.log("Connected to socket server");
			changeSocket(socket)

			if(type === "random"){
				socket.emit("search", diff)
			} else if(type === "private"){
				socket.emit("create", diff)
			}
		});

		socket.on("searching", (code) => {
			console.log("Searching for opponents w/ code", code)
			setCodeSearch(code)
			setWaiting(true)
		})

		socket.on("match", (code) => {
			setWaiting(false)
			navigate(`/race/${code}`)
		})
		  
		socket.on("disconnect", () => {
			console.log("Disconnected from socket server"); 
		});
	  
		socket.on("connect_error", (e) => {
			console.log(e.message)
			//sock.connect();
		});

		socket.on("create", (code) => {
			navigate(`/matchmaking/${code}`)
		})

	}

	let handleStop = () => {
		//console.log("Stopping searching for opponents w/ code", code)
		setWaiting(false)
		socket.emit('cancel', code)
	}

	useEffect(()=>{
		return () => {
			socket.removeAllListeners();
		  };
	}, [])


	return(
	<React.Fragment>
		{waiting && <div className={classes.waitingContainer}>
			<div className={classes.waitingInner}>
				<p className={classes.waitingText}>Finding opponent</p>
				<CircularProgress style={{height: '85px', width: '85px', marginBottom: '30px', marginTop: '20px'}} />
				<button className={classes.stopButton} onClick={handleStop}>Stop Searching</button>
			</div>
		</div>}
	<div>
		<div className={classes.container}>
			<div className='leftBox'>
				<h2>Create Lobby</h2>
				<h4>Game Type</h4>

				<ToggleButtonGroup
			      value={type}
			      exclusive
			      onChange={handleType}
			      color='success'
			      size='small'
		    	>
				      <ToggleButton value="random">
				        Random
				      </ToggleButton>
				      <ToggleButton value="private">
				        Private
				      </ToggleButton>
				</ToggleButtonGroup>
				
				<h4>Difficulty</h4>
				
				<ToggleButtonGroup
			      value={diff}
			      exclusive
			      onChange={handleDiff}
			      color='success'
			      size='small'
		    	>
				      <ToggleButton value="Easy">
				        Easy
				      </ToggleButton>
				      <ToggleButton value="Medium">
				        Medium
				      </ToggleButton>
				      <ToggleButton value="Hard">
				        Hard
				      </ToggleButton>
				</ToggleButtonGroup>
				<div>
					<button className={classes.buttonBlack} onClick={handleMatchmaking}>Start</button>
				</div>
			</div>
		</div>

		<div className={classes.containerB} >
			<h2>Join Lobby</h2> 
		</div>
		<div className={classes.containerB}>
			<form >
		      <label>Lobby Code:   
		        <input value={lobbyCode} onChange={(e)=>{setCode(e.target.value)}} className={classes.input} type="text" />
		      </label>
		    </form>
		</div>
		<div className={classes.containerB}>
		    <button className={classes.buttonBlack} onClick={handleJoin}>Go</button>
		</div>
	</div>
	</React.Fragment>

	)
}

export default Lobbymaking;

const useStyles = makeStyles(theme => ({ 
    container: {
        height: '300px',
        padding: '40px',
        backgroundColor: '#eef1f4',

    },
    containerB: {
    	display: 'flex',
        justifyContent: 'center',
        alignItems:'center'

    },
	waitingContainer: {
		position: 'absolute',
		zIndex: '3',
		backgroundColor: 'rgba(0,0,0,0.5)',
		height: '100%',
		width: '100%'
	},
	waitingInner: {
		height: '300px',
		width: '500px',
		backgroundColor: 'white',
		margin: '70px auto auto auto',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	waitingText: {
		fontSize: '25px',
		textAlign: 'center',
		fontWeight: 'bold',
		color: 'black'
	},
	stopButton: {
		width: '150px',
        height: '30px',
        border: '0px',
        borderRadius: "20em",
        color: 'white',
        backgroundColor: '#29313c',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px'
	},
  	body: {
        textAlign: 'center',
    },
    buttonBlack: {
        width: '80px',
        height: '20px',
        border: '0px',
        borderRadius: "20em",
        color: 'white',
        backgroundColor: '#29313c',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px'
    },
    buttonWhite: {
        width: '120px',
        height: '30px',
        border: '0px',
        borderRadius: "20em",
        color: 'black',
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px'
    },
    input: {
		border: '1px solid #d9d9d9',
		width:'50%',
		padding: '10px',

	},
}))

