import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import firebase from '../../Firebase'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {
    maxWidth: 900,
    minHeight: 300
  },
});

const Forget = (props) => {
  const classes = useStyles();
    const [myform, setMyform] = React.useState({
        email: '',
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
        firebase.auth().sendPasswordResetEmail(myform.email).then((u) => {
          alert('An email has been sent to email address ,', myform.email, '. Follow the directions in the email to reset password')
          props.history.push('/')
        }).catch((error) => {
          alert(error.message)
        });
      }
    return (
      <div style={{ backgroundSize: 'cover', backgroundImage: `url(${'http://www.twitrcovers.com/wp-content/uploads/2014/06/Coffee-l.jpg'})` }}>
      <Grid container direction="row" justify="center" alignItems="center" spacing={0} style={{ minHeight: '100vh' }}>
        <Grid item xs={6} >
          <form onSubmit={handleSubmit}>
            <Card className={classes.card}>
              <CardHeader style={{textAlign: 'center'}} title="Forgot your password?" subheader = "Enter your email address bellow" />
              <CardContent>
                <Grid container spacing={0} direction="column">
                  <Grid item xs>
                    <TextField id="outlined-email-input" label="Email" className={classes.textField} type="email" name="email" autoComplete='off'
                      required margin="normal" variant="outlined" onChange={handleChange} fullWidth />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions disableSpacing>
                <Grid container justify='space-between' spacing={0}>
                  <Grid item >
                    <Button variant="text" size="large" color="primary" onClick={() => props.history.push('/sign-in')} >
                      Back
                    </Button>
                  </Grid>
                  <Grid item >
                    <Button variant="contained" size="large" color="primary" type="submit" >
                      Reset password
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

export default Forget;
