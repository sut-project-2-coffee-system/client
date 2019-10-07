import React, { Component } from 'react'
/* import Typography from '@material-ui/core/Typography'; */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import 'typeface-roboto';
import Bigbutton from './home/Bigbutton';
/* import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles'; */
import firebase from '../Firebase'

/* const IOSSwitch = withStyles(theme => ({
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
}); */



export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      status: true,
      checked: true,
      button: [],
      buttonList: []
    }
    this._isMounted = false;
  }

  getButtonList = async () => {
    await firebase.database().ref("buttonList").on("value", snapshot => {
      let val = snapshot.val()
      this.setState({ buttonList: val })
    })
  }

  getButton = async () => {
    let user = firebase.auth().currentUser;

    await firebase.database().ref("staff").on("value", snapshot => {
      let val = snapshot.val()
      let arr = []
      if (val[user.uid].role !== undefined) {
        arr = val[user.uid].role
        this.setState({
          button: this.state.buttonList.filter(function(cur) {
              return arr.includes(cur.text)
          },{})
        })
        //console.log(this.state.button)
      }
    })
  }

  async componentWillMount() {
    this._isMounted = true;
    //if (this._isMounted) {
      await this.getButtonList()
      await this.getButton()
    //}

    /* this.storeRef.on("value", snapshot=>{
      let val = snapshot.val()
      this.setState({checked : val.storeStatus} )
    }) */
  }

  /* handleChange = (event) => {
    console.log(this.state.checked)
    this.setState({ checked: !this.state.checked });
    firebase.database().ref("store").set({
      storeStatus: this.state.checked
    })
  } */
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {

    return (
      <div >
        <Container maxWidth="xl" style={{ height: '100vh', backgroundColor: "#FFC1B1" }}>
          <Grid container style={{ height: '100vh' }}
            alignItems="flex-start"
            justify="space-evenly">
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6} container justify="flex-end">
              {/* <Typography variant="h2" style={{ color: "#114B5F", marginTop: "15px" }}>
                <b>Status :</b> {this.state.checked ? (<span>Close</span>) : (<span>Open</span>)}
                <IOSSwitch
                  onChange={(event) => this.handleChange(event)}
                  value={this.state.checked} />
              </Typography> */}
            </Grid>
            <Grid item xs={7} lg={7} sm={7} container direction="row" justify="space-evenly" >
              {console.log(this.state.button)}
              {this.state.button.map((cur, i) => {
                return (
                  <Bigbutton key={i} to={cur.to} text={cur.text} img={cur.img} />
                )
              })}
            </Grid>
          </Grid>
        </Container>
      </div>
    )
  }
}
