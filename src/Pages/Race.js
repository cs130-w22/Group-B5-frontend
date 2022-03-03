import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom'

function Race({socket, changeSocket}) {
    const classes = useStyles();
    let location = useLocation();
    let params = useParams();
    let navigate = useNavigate();

    const [active, setActive] = useState(true);
    const [time, setTime] = useState(new Date().getTime());
    const [probName, setProbName] = useState("")
    const [problem, setProblem] = useState('Load Problem Here');
    const [languages, setLanguages] = useState([])
    const [language, setLanguage] = useState('cpp');
    const [written, setWritten] = useState("")
    const [results, setResults] = useState([]);
    const [winner, setWinner] = useState(null)

    useEffect(() => {
        active && setTimeout(() => setTime(time+.1), 1000);
    }, [time]);

    useEffect(()=>{
        setProbName(location.state.problem.title);
        setProblem(location.state.problem.content);
        setLanguages(location.state.problem.code);
        setWritten(location.state.problem.code[0].code);

        socket.on("win", (winner)=>{
            console.log(`${winner} just won the race!`)
            setWinner(winner)
        })

        socket.on("notification", (notif_obj)=>{
            let notif = JSON.parse(notif_obj)
            // let statusMap = {
            //     0:"Accepted",
            //     1:"Compile Error",
            //     2:"Wrong Answer",
            //     3:"Time Limit Exceeded",
            //     4: "Memory Limit Exceeded",
            //     5:"Output Limit Exceeded",
            //     6:"Runtime Error",
            //     7:"Internal Error",
            //     8:"Unknown Error",
            //     9:"Server Timeout",
            //     10:"Submission Not Ready",
            // }
            let message;
            switch(notif.status){
                case 0: message = `${notif.username} passed all testcases!`; break;
                case 1: message = `${notif.username}'s code failed to compile`; break;
                case 2: message = `${notif.username} just passed ${notif.total_correct} out of ${notif.total_testcases}!`; break;
                case 3: message = `${notif.username} just passed ${notif.total_correct} out of ${notif.total_testcases}, but got TLE!`; break;
                case 4: message = `${notif.username} just passed ${notif.total_correct} out of ${notif.total_testcases}, but got MLE!`; break;
                default: 
                    if(notif.hasOwnProperty("total_correct") && notif.hasOwnProperty("total_testcases"))
                        message = `${notif.username} just passed ${notif.total_correct} out of ${notif.total_testcases}, but some other error occurred!`
                    else
                        message = `${notif.username} submitted their code, but an issue occurred.`

            }
            console.log(notif)
            setResults((prev)=> [...prev, message])
        })

        socket.on("submission", (submission_info) => {
            let parsed = JSON.parse(submission_info)
            console.log(parsed)
        })

        return () => {
            changeSocket(null);
            setWinner(null)
            if(socket !== null) socket.disconnect()
        }
    }, [])

    let showTime = () => {
        if (!active) {
            return `Player ${winner}  Wins`;
        }

        var curr = new Date().getTime();
        var timeDiff = Math.floor( (curr - time) / 1000 );

        var minutes = Math.floor(timeDiff / 60);
        var seconds = timeDiff - minutes * 60;

        return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    }

    let handleSubmitButton = () => {
        if(!winner)
            socket.emit('submit', params.lobbyCode, language, written)
    }

    let changeLang = (langNum) => {
        setLanguage(languages[langNum].langSlug)
        setWritten(languages[langNum].code)
    }

    let handleQuitButton = () => {
        socket.emit('leave', params.lobbyCode);
        socket.disconnect();
        navigate("/matchmaking")
    }

    return (
        <React.Fragment>
        {winner && <div className={classes.waitingContainer}>
			<div className={classes.waitingInner}>
				<p className={classes.waitingText}>Game Over</p>
                <p className={classes.waitingText}>{winner} has won the race!</p>
				<button className={classes.stopButton} onClick={handleQuitButton}>Back to Matchmaking</button>
			</div>
		</div>}
        <div className={classes.container}>
            <div className={classes.row}>
                <div className={classes.time_box}>{showTime()}</div>
            </div>

            <div className={classes.row}>
                {/* Left */}
                <div className={classes.item}>
                    <p className={classes.label}>Problem: {probName}</p>
                    <div className={classes.problem_box} readOnly dangerouslySetInnerHTML={{__html: problem}} />

                </div>

                {/* Right */}
                <div className={classes.item}>
                    <p className={classes.label}>Solution:</p>
                    <textarea className={classes.solution_box} value={written} onChange={(e)=>{setWritten(e.target.value)}} />

                    <div className={classes.submission}>
                        {/* Language selector dropdown */}
                        <select className={classes.lang_sel} onChange={(e) => setLanguage(e.target.value)} onChange={(e) => changeLang(e.target.value)}>
                            {languages.map((l, i)=> {
                                return <option key={i} value={i}>{l.lang}</option>
                            })}
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
                <div className={classes.result_box}>
                    {results.map((r, i) => {
                        <p key={i} className={classes.notif}>{r}</p>
                    })}
                </div>
            </div>
        </div>
        </React.Fragment>
    )
    
}

const useStyles = makeStyles(theme => ({
    container: {
        margin: 'auto auto auto auto',
        backgroundColor: 'white',   
    },
    notif: {
        fontSize: '12px',
        margin: '2px'
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
        width: '16%',
        height: '25px',
        resize: 'none',
        paddingTop: '5px',
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
        border: '1px solid black',
        overflow: 'scroll'
    },
    solution_box: {
        width: '96.5%',
        height: '80%',
        resize: 'none',
        padding: '15px',
        fontSize: '15px',
        fontFamily: 'monospace',
        outline: 'none',
        border: '1px solid black',
        color: 'black'
    },
    result_box: {
        width: '91.7%',
        height: '100px',
        padding: '15px',
        fontSize: '17px',
        fontFamily: 'monospace',
        outline: 'none',
        border: 'solid #4f4f4f 1px',
        borderRadius: '2px',
        overflow: 'scroll'
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

}))

export default Race;

