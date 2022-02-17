
import { makeStyles } from '@mui/styles';
import React, { useState } from "react";

function Lobbymaking(props){
	const classes = useStyles();
	const [cls, setCls] = useState(
		{
			activeObject: null,
			objects: [{id:1}, {id:2}]
		});

	const [diff, setDiff] = useState(classes.buttonBlack);
	function toggleActive(index){
		setCls({ ...cls, activeObject: cls.objects[index] });
	}

	function toggleActiveStyles(index){
		if(cls.objects[index] === cls.activeObjext)
		{
			return classes.buttonBlack;
		}
		else
		{
			return classes.buttonWhite;
		}
	}

	return(
	<div>
		<h3>Create Lobby</h3>
		<h4>Game Type</h4>
		{
			cls.objects.map((elements, index) => (
			<button
				key = {index}
				className= {toggleActiveStyles(index)}
				onClick={() => {
					toggleActive(index);
				}}
			>Yeet</button>
		))}

		<button 
		className={diff}
		onClick={() => setDiff((diff) => (diff === classes.buttonBlack ? classes.buttonWhite : classes.buttonBlack))}
		>  Private 
		</button>
		<button className={classes.buttonWhite}>  Random </button>
		<h4>Difficulty</h4>
		<button 
		className={diff}
		onClick={() => setDiff((diff) => (diff === classes.buttonBlack ? classes.buttonWhite : classes.buttonBlack))}
		> 
		Easy
		</button>

	</div>
	



	)
}

export default Lobbymaking;

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
        marginLeft: '50px'
    },
    rightBox: {
        width: '500px',
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
        width: '80px',
        height: '20px',
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
}))

