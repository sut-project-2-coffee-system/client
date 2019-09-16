import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import firebase from '../../Firebase'

const useStyles = makeStyles({
    card: {
        maxWidth: 900,
    },
});

const SignUp = (props) => {
    const classes = useStyles();
    const [myform, setMyform] = React.useState({
        email: '',
        password: '',
        displayName: '',
        phoneNumber: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(myform.email, myform.password).then((userCredential) => {
            if (userCredential) {
              userCredential.user.updateProfile({
                displayName: myform.displayName,
                phoneNumber: myform.phoneNumber
              })
            }
          })
            .then((sendEmailVerify) => {
              if (sendEmailVerify === false)
                return false
              else {
                firebase.auth().currentUser.sendEmailVerification();
                alert('Please check your email to verify email.')
                props.history.push('/')
                return true
              }
            })
            .catch((error) => {
              if (error.code === 'auth/weak-password')
                alert('The password is too weak')
              else
                alert(error.message)
            })
    }

    const handleChange = (event) => {
        event.persist();
        setMyform(oldmyform => ({
            ...oldmyform,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <div style={{backgroundSize: 'cover',backgroundImage: `url(${'http://www.twitrcovers.com/wp-content/uploads/2014/06/Coffee-l.jpg'})`}}>
            <Grid container direction="row" justify="center" alignItems="center" spacing={0} style={{ minHeight: '100vh' }}>
                <Grid item xs={6} >
                    <form onSubmit={handleSubmit}>
                    <Card className={classes.card}>
                        <CardHeader style={{textAlign: 'center'}} title="Sign up" subheader = 'Create new account'/>
                        <CardContent >
                            <Grid container spacing={0} direction="column">
                                <Grid item xs={12}>
                                <TextField id="outlined-displayName-input" label="Username" className={classes.textField} type="text" name="displayName" autoComplete='off'
                                    required margin="normal" variant="outlined" onChange={handleChange} fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                <TextField id="outlined-email-input" label="Email" className={classes.textField} type="email" name="email" autoComplete='off'
                                   required margin="normal" variant="outlined" onChange={handleChange} fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                <TextField id="outlined-password-input" label="password" className={classes.textField} type="password" name="password" autoComplete='off'
                                   required margin="normal" variant="outlined" onChange={handleChange} fullWidth/>
                                </Grid>
                                <Grid item xs={12}>
                                <TextField id="outlined-phoneNumber-input" label="PhoneNumber" className={classes.textField} type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" name="phoneNumber" autoComplete='off'
                                    required margin="normal" variant="outlined" onChange={handleChange} fullWidth/>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions disableSpacing>
                        <Grid container justify='space-between' spacing={0}>
                            <Grid item >
                                <Button variant="text" size="large" color="primary" onClick={() => props.history.push('/sign-in')} >
                                    Sign in
                                </Button>
                            </Grid>
                            <Grid item >
                                <Button variant="contained" size="large" color="primary" type="submit" >
                                    Sign up
                                </Button>
                            </Grid>
                        </Grid>
                        </CardActions>
                    </Card>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default SignUp;
