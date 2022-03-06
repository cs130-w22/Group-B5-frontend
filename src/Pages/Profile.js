import About from '../Components/About'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import logo from '../assets/Leetracer_plain.png'

const API_URL = process.env.REACT_APP_API_URL

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function labelData(title, difficulty, time, winner) {
  return { title, difficulty, time, winner };
}

//hopefully this can be easily changed to format the backend output?
//fake data
const rows = [
  labelData('Compare Version Numbers', 'Medium', '14:54', 'User1'),
  labelData('Two Sum', 'Easy', '11:20', "User3"),
];



function Profile(props) {
	const classes = useStyles();
	const [data, setData] = React.useState([]);
	React.useEffect(async ()=> {        
        try {
           	let username = localStorage.getItem('username')
           	let res = await axios.get(`${API_URL}/stats/user/${username}`)
            setData(res.data.races);            
        } catch(e){
           	console.log('error wtf')
        }
	}, []);

    const DisplayData=data.map(
        (row)=>{
            return(
                <TableBody>
		            <StyledTableRow key={row.title}>
		              <StyledTableCell align= "center" component="th" scope="row">
		                {row.title}
		              </StyledTableCell>
		              <StyledTableCell align="center">{row.difficulty}</StyledTableCell>
		              <StyledTableCell align="center">{row.timeToSolve}</StyledTableCell>
		              <StyledTableCell align="center">{row.winner}</StyledTableCell>
		            </StyledTableRow> 
                </TableBody>
            )
        }
    )
    return (
        <div style={{margin: '50px 40px 0px 40px'}}>
            <div className = {classes.container}>
			<h1>Profile</h1>
			<h3 style={{marginTop: '40px'}}>Problem History</h3>
            <TableContainer component={Paper}>
		      <Table sx={{ minWidth: 700 }} aria-label="customized table">
		        <TableHead>
		          <TableRow>
		            <StyledTableCell align="center">Title</StyledTableCell>
		            <StyledTableCell align="center">Difficulty</StyledTableCell>
		            <StyledTableCell align="center">Time</StyledTableCell>
		            <StyledTableCell align="center">Winner</StyledTableCell>
		          </TableRow>
		        </TableHead>
		
		        	{console.log('hiyo')}
		          	{DisplayData}
		      </Table>
		    </TableContainer>
		    </div>
        </div>
    )
}

export default Profile;


const useStyles = makeStyles(theme => ({ 
    container: {
        height: 'auto',
        margins: 'auto auto auto auto',
        padding: '25px',
        backgroundColor: '#eef1f4',

    },

  
}))
