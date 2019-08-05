import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import 'typeface-roboto';
import Bigbutton from '../components/Bigbutton';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';



const IOSSwitch = withStyles(theme => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });



export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            status: true
        }
    }


    
    render() {
        return (
            <div >
                <Container maxWidth="xl" style={{ height: '100vh' }}>
                    <Grid container style={{ height: '100vh' }}
                        alignItems="center"
                        justify="space-evenly">
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={6} container justify="flex-end">
                            <Typography variant="h2" style={{ color: "#114B5F" }}>
                                <b>Status :</b> Open  
                                <IOSSwitch/>
                            </Typography>
                        </Grid>
                        <Grid item lg={8} sm={10} container direction="row" justify="space-evenly" >
                            <Bigbutton to="/member" onclick="activateLasers()" text="Cashier" img="https://firebasestorage.googleapis.com/v0/b/coffe-system-yiakpd.appspot.com/o/MenuIcon%2Fcashier%20(1).svg?alt=media&token=b1a52dee-1c7e-4a47-9e30-d50aa27f308d" />
                            <Bigbutton to="/order" text="Order" img="https://firebasestorage.googleapis.com/v0/b/coffe-system-yiakpd.appspot.com/o/MenuIcon%2Fmenu.svg?alt=media&token=73832d6e-0000-4d25-9f8d-e8599e86e021" />
                            <Bigbutton to="/member" text="History" img="https://firebasestorage.googleapis.com/v0/b/coffe-system-yiakpd.appspot.com/o/MenuIcon%2Fhistory.svg?alt=media&token=52479cd4-fb36-4097-8742-d9c3587f16c7" />
                        </Grid>
                        <Grid item lg={8} sm={10} container direction="row" justify="space-evenly">
                            <Bigbutton to="/menu" text="Menu" img="https://firebasestorage.googleapis.com/v0/b/coffe-system-yiakpd.appspot.com/o/MenuIcon%2Frestaurant.svg?alt=media&token=6b8541b9-fbeb-4c3e-8857-ec8996beee20" />
                            <Bigbutton to="/member" text="Member" img="https://firebasestorage.googleapis.com/v0/b/coffe-system-yiakpd.appspot.com/o/MenuIcon%2Fid-card.svg?alt=media&token=78ea1153-848c-413e-95bc-a038028bdbe3" />
                            <Bigbutton to="/member" text="Staff" img="https://firebasestorage.googleapis.com/v0/b/coffe-system-yiakpd.appspot.com/o/MenuIcon%2Fconsultation.svg?alt=media&token=0f515610-61a4-4a62-b3a3-4b35c5ed3c47" />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}
