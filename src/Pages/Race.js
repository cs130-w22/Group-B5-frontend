import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';

function Race(props) {
    const classes = useStyles();

    const [active, setActive] = useState(true);
    const [time, setTime] = useState(new Date().getTime());
    const [problem, setProblem] = useState('Load Problem Here');
    const [language, setLanguage] = useState('c');
    const [result, setResult] = useState('Load Result Here');

    React.useEffect(() => {
        active && setTimeout(() => setTime(time+.1), 1000);
    }, [time]);

    function showTime() {
        if (!active) {
            return 'Player X Wins';
        }

        var curr = new Date().getTime();
        var timeDiff = Math.floor( (curr - time) / 1000 );

        var minutes = Math.floor(timeDiff / 60);
        var seconds = timeDiff - minutes * 60;

        return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    }

    {/* Need to get the problem description from backend and load into problem */}

    {/* This is a pretty poor implementation of this part at the moment */}
    function updateStarterCode(e) {
        {/* Does the starter code depends on the problem? */}
        var starterCode;
        switch(e) {
            case 'c':
                starterCode = 
`#include <stdio.h>
int main(){
\tprintf("Hello C Language");
\treturn 0;
}`; break;
            case 'c++':
                starterCode =
`Starter C++ Code`; break;
            case 'java':
                starterCode =
`Starter Java Code`; break;
            case 'python':
                starterCode =
`Starter Python Code`; break;
            default:
                starterCode = "";
                break;
        }
        document.getElementById('solution').value = starterCode;
    }

    function handleSubmitButton() {
        setResult('Send solution to backend and display test results here.');
        {/* Pass document.getElementById('solution').value and language to backend */}
        {/* Get test result summary from backend and set result */}
    }

    function handleQuitButton() {
        setResult('Player quit the game. Notify the opponent that the game has ended.');
        setActive(false);
        {/* Notify opponent that the player has left */}
        {/* Should the player be taken back to the home page? */}
    }

    return (
        <div className={classes.container}>
            <div className={classes.row}>
                <text className={classes.time_box}>{showTime()}</text>
            </div>

            <div className={classes.row}>
                {/* Left */}
                <div className={classes.item}>
                    <p className={classes.label}>Problem:</p>
                    <textarea className={classes.problem_box} value={problem} readOnly></textarea>

                </div>

                {/* Right */}
                <div className={classes.item}>
                    <p className={classes.label}>Solution:</p>
                    <textarea className={classes.solution_box} id='solution' spellcheck='false' placeholder='select a language' onKeyDown={(e) => {
                        if ( e.key === 'Tab' && !e.shiftKey ) {
                            document.getElementById('solution').value+='\t';
                            e.preventDefault();
                            return false; }
                    }}></textarea>

                    <div className={classes.submission}>
                        
                        {/* Language selector dropdown */}
                        <select className={classes.lang_sel} onChange={(e) => setLanguage(e.target.value)} onChange={(e) => updateStarterCode(e.target.value)}>
                            <option value='c'>C</option>
                            <option value='c++'>C++</option>
                            <option value='java'>Java</option>
                            <option value='python'>Python</option>
                        </select>
                        
                        <div className={classes.buttons}>
                            <button className={classes.submit_btn} onClick={() => handleSubmitButton()}>Submit</button>
                            <button className={classes.quit_btn} onClick={() => handleQuitButton()}>Quit</button>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom */}
            <div className={classes.row}>
                
                <text className={classes.result_box}>{result}</text>
                
            </div>
        </div>
    )
    
}

const useStyles = makeStyles(theme => ({
    container: {
        margin: 'auto auto auto auto',
        backgroundColor: 'white',   
    },
    row: {
        margin: 'auto auto auto auto',
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    item: {
        height: '700px',
        width: '45%',
        marginBottom: '20px',
    },
    label: {
        fontSize: '20px',
    },
    submission: {
        marginTop: '5px',
    },
    buttons: {
        display: 'inline-block',
        float: 'right',
    },

    time_box: {
        width: '15%',
        height: '40px',
        resize: 'none',
        paddingTop: '20px',
        fontSize: '20px',
        fontFamily: 'monospace',
        textAlign: 'center',
        outline: 'none',
        border: 'solid #4f4f4f 1px',
        borderRadius: '2px',
    },
    problem_box: {
        width: '96.5%',
        height: '86.3%',
        resize: 'none',
        padding: '15px',
        fontSize: '17px',
        fontFamily: 'monospace',
        outline: 'none',
    },
    solution_box: {
        width: '96.5%',
        height: '80%',
        resize: 'none',
        padding: '15px',
        fontSize: '15px',
        fontFamily: 'monospace',
        outline: 'none',
    },
    result_box: {
        width: '91.7%',
        height: '100px',
        resize: 'none',
        padding: '15px',
        fontSize: '17px',
        fontFamily: 'monospace',
        outline: 'none',
        border: 'solid #4f4f4f 1px',
        borderRadius: '2px',
    },

    lang_sel: {
        width: '40%',
        height: '35px',
        borderRadius: '5px',
        borderColor: '#4f4f4f',
        fontSize: '14px',
        marginRight: '20px',
    },
    submit_btn: {
        width: '110px',
        height: '35px',
        border: '0px',
        borderRadius: "20em",
        color: 'white',
        backgroundColor: '#29313c',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginRight: '20px',
    },
    quit_btn: {
        width: '90px',
        height: '35px',
        border: '0px',
        borderRadius: "20em",
        color: 'white',
        backgroundColor: '#aaaaaa',
        '&:hover': { backgroundColor: '#29313c' },
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginRight: '20px',
    },

}))

export default Race;