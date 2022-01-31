import { makeStyles } from '@mui/styles';

function About(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.center}>
                <h2 className={classes.title}>What is Leetracer?</h2>
                <p className={classes.body}>Leetracer allows you to compete against others in a live race to solve software engineering interview questions</p>
            </div>
            <div className={classes.row}>
                <div className={classes.rowitem}>
                    <h4 className={classes.subtitle}>Compete</h4>
                    <p className={classes.body}>Create private lobbies or race against random users across the world</p>
                </div>
                <div className={classes.rowitem}>
                    <h4 className={classes.subtitle}>User Content</h4>
                    <p className={classes.body}>Submit new problems for your peers to test against</p>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    container: {
        height: '500px',
        margin: 'auto auto auto auto',
        padding: '40px',
        backgroundColor: 'white',
    },
    center: {
        width: '40%',
        margin: 'auto auto auto auto',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    rowitem: {
        width: '25%',
        height: '300px',
    },
    title: {
        fontSize: '36px',
        color: 'black',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '24px',
        color: 'black',
        textAlign: 'center',
    },
    body: {
        fontSize: '22px',
        color: 'gray',
        textAlign: 'center',
    },
}))

export default About;