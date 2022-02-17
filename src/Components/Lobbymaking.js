
import { makeStyles } from '@mui/styles';
import React, { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

function Lobbymaking(props){
	const classes = useStyles();
	
	const [diff, setDiff] = useState('easy');
	
	const [type, setType] = React.useState('random');

	const handleType = (event, newType) => {
	    setType(newType);
	};

	const handleDiff = (event, newDiff) => {
	    setDiff(newDiff);
	};


	return(
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
				      <ToggleButton value="easy">
				        Easy
				      </ToggleButton>
				      <ToggleButton value="medium">
				        Medium
				      </ToggleButton>
				      <ToggleButton value="hard">
				        Hard
				      </ToggleButton>
				</ToggleButtonGroup>
				<div>
					<button className={classes.buttonBlack}>Start</button>
				</div>
			</div>
		</div>

		<div className={classes.containerB} >
			
				<h2>Join Lobby</h2> 
		</div>
		<div className={classes.containerB}>
			<form >
		      <label>Lobby Code:   
		        <input className={classes.input} type="text" />
		      </label>
		    </form>
		</div>
		<div className={classes.containerB}>
		    	<button className={classes.buttonBlack}>Go</button>
		</div>
	</div>


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

