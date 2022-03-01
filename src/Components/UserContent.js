import { useState } from 'react'
import { makeStyles } from '@mui/styles';
import { useAuth } from '../config'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function UserContent(props){
    const {  user } = useAuth();
    const classes = useStyles();
    const [success, changeSuccess] = useState(false)
    const [difficulty, changeDifficulty] = useState("EASY")
    const [description, changeDescription] = useState("")
    const [testcases, changeTestCases] = useState([])
    const [input, changeInput] = useState("")
    const [output, changeOutput] = useState("")

    let handleSubmit =  (e) => {
        
    }

    let handleAdd = () => {
        if(input === "" || input === "")

        changeTestCases((prev) => [...prev, {input, output}])
        changeInput("")
        changeOutput("")
    }

    return (
        <div className={classes.container}>
            <div className={classes.submissionContainer}>
                <h3 className={classes.title}>Submit a Question</h3>
                <textarea className={classes.description} value={description} onChange={(e) => changeDescription(e.target.value)} />
                <div className={classes.buttonBox}>
                    <button className={classes.diffbutton} onClick={()=> changeDifficulty("EASY")}
                        style={difficulty!=="EASY" ? {backgroundColor: "white", border: '1px solid #28313c', color: '#28313c'} : null}>EASY</button>
                    <button className={classes.diffbutton} onClick={()=> changeDifficulty("MEDIUM")}
                        style={difficulty!=="MEDIUM" ? {backgroundColor: "white", border: '1px solid #28313c', color: '#28313c'} : null}>MEDIUM</button>
                    <button className={classes.diffbutton} onClick={()=> changeDifficulty("HARD")}
                        style={difficulty!=="HARD" ? {backgroundColor: "white", border: '1px solid #28313c', color: '#28313c'} : null}>HARD</button>
                </div>
                <p>Test Cases</p>
                <div style={{maxHeight: '250px', overflow: 'scroll'}}>
                    {testcases.map((tc) => {
                        return <div style={{display: 'flex', margin: '15px'}}> 
                            <span>Input:</span>
                            <input className={classes.input} readonly="readonly" type="text" value={tc.input} />
                            <span>Output:</span>
                            <input className={classes.input} readonly="readonly" type="text" value={tc.output} />
                        </div>
                    })}
                </div>
                <div className={classes.inputRow}>
                    <span>Input:</span>
                    <input className={classes.input} type="text" value={input} onChange={(e)=>{changeInput(e.target.value)}} />
                    <span>Output:</span>
                    <input className={classes.input} type="text" value={output} onChange={(e)=>{changeOutput(e.target.value)}} />
                </div>
                <button className={classes.diffbutton} onClick={handleAdd} style={{width: '135px', marginBottom: '20px'}}
                    >ADD TEST CASE</button>
                <button className={classes.diffbutton} style={{fontSize: '19px', fontWeight: 'bold', height: '50px', width: '190px', 
                    borderRadius: '30px', alignSelf: 'flex-end'}}>SUBMIT</button>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        width: '80%',
        margin: 'auto'
    },
    submissionContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: '22px',
        margin: '20px 0px 30px 0px',
        fontWeight: 'normal',
    },
    description: {
        border: '1px solid black',
        borderRadius: '3px',
        boxSizing: 'border-box',
        height: '100px',
        resize: 'none',
        padding: '5px'
    },
    diffbutton: {
        border: 'none',
        height: '28px',
        width: '90px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 'normal',
        backgroundColor: '#28313c',
        color: 'white',
        cursor: 'pointer'
    },
    buttonBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '20px',
        alignItems: 'center',
        width: '290px',
    },
    inputRow: {
        display: 'flex',
        marginBottom: '30px'
    },
    input: {
        display: 'inline-block',
        boxSizing: 'border-box',
        height: '40px',
        width: '250px',
        border: '1px solid #28313c',
        borderRadius: '3px',
        marginLeft: '20px',
        marginRight: '20px',
        paddingLeft: '5px',
        outline: 'none'
       
    }
}))

export default UserContent;

