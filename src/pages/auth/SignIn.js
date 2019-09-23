import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import firebase from '../../Firebase'
import { connect } from 'react-redux'

const useStyles = makeStyles({
  card: {
    maxWidth: 900,
    minHeight: 400
  },
});

const SignIn = (props) => {
  const classes = useStyles();
  const [myform, setMyform] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    event.persist();
    setMyform(oldmyform => ({
      ...oldmyform,
      [event.target.name]: event.target.value,
    }));
  }
  const handleSubmit = (event) =>{
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(myform.email, myform.password).then((user) => {
      props.dispatch({
        type: 'signIn',
        payload: user
      })
      props.history.push('/')
    }).catch((error) => {
      alert(error.message)
    });
  }

  return (
    <div style={{ backgroundSize: 'cover', backgroundImage: `url(${'http://www.twitrcovers.com/wp-content/uploads/2014/06/Coffee-l.jpg'})` }}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={0} style={{ minHeight: '100vh' }}>
        <Grid item xs={6} >
          
            <Card className={classes.card}>
              <CardHeader style={{textAlign: 'center'}} title="Sign in" subheader = 'Use your account' />
              <CardContent>
                <Grid container spacing={0} direction="column">
                  <Grid item xs>
                    <TextField id="outlined-email-input" label="Email" className={classes.textField} type="email" name="email" autoComplete='off'
                      required margin="normal" variant="outlined" onChange={handleChange} fullWidth />
                  </Grid>
                  <Grid item xs>
                    <TextField id="outlined-password-input" label="password" className={classes.textField} type="password" name="password" autoComplete='off'
                      required margin="normal" variant="outlined" onChange={handleChange} fullWidth />
                  </Grid>
                </Grid>
                <Button variant="text" size="medium" color="primary" onClick={() => props.history.push('/forgot-password')} >
                        Forgot password ?
                </Button>
              </CardContent>
              <CardActions disableSpacing>
                <Grid container justify='space-between' spacing={0}>
                  <Grid item >
                    {/* <Button variant="text" size="large" color="primary" onClick={() => props.history.push('/sign-up')} >
                        Create account
                    </Button> */}
                  </Grid>
                  <Grid item >
                    <Button variant="contained" size="large" color="primary" onClick={handleSubmit} >
                      Sign in
                    </Button>
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          
        </Grid>
      </Grid>
    </div>
  )
}

function mapStatetoProps(state) {
  return {
    user: state.user,
  }
}

export default connect(mapStatetoProps)(SignIn);
