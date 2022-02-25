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
import logo from '../Components/Leetracer_plain.png'

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

function labelData(name, difficulty, type, time) {
  return { name, difficulty, type, time };
}

//hopefully this can be easily changed to format the backend output?
const rows = [
  labelData('Compare Version Numbers', 'Medium', 'Array', '14:54'),
  labelData('Two Sum', 'Easy', 'Array', '11:20'),
];

const user = "Naruto";
const pass = "Ramen";

function Profile(props) {
	const classes = useStyles();
    return (
        <div>
        	<h2>Problem History </h2>
            <div className = {classes.container}>
            <TableContainer component={Paper}>
		      <Table sx={{ minWidth: 700 }} aria-label="customized table">
		        <TableHead>
		          <TableRow>
		            <StyledTableCell align="center">Name</StyledTableCell>
		            <StyledTableCell align="center">Difficulty</StyledTableCell>
		            <StyledTableCell align="center">Problem Type</StyledTableCell>
		            <StyledTableCell align="center">Time</StyledTableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {rows.map((row) => (
		            <StyledTableRow key={row.name}>
		              <StyledTableCell align= "center" component="th" scope="row">
		                {row.name}
		              </StyledTableCell>
		              <StyledTableCell align="center">{row.difficulty}</StyledTableCell>
		              <StyledTableCell align="center">{row.type}</StyledTableCell>
		              <StyledTableCell align="center">{row.time}</StyledTableCell>
		            </StyledTableRow>
		          ))}
		        </TableBody>
		      </Table>
		    </TableContainer>
		    </div>
		    <div className={classes.container} >
		    	<p>Username: {user} </p>
		    	<p>Password: {pass} </p>
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
