import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MiniDrawer from './components/sidebar/MiniDrawer'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import firebase from './Firebase'
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import { connect } from 'react-redux'
import Forget from './pages/auth/Forget';



const AppContaner = () => (
  <div >
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route component={MiniDrawer} />
    </Switch>
  </div>
)

const SignInContainer = () => (
  <div >
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route path="/sign-up" component={SignUp} />
      <Route path="/forgot-password" component={Forget} />
      <Route component={SignIn} />
    </Switch>
  </div>
)

class App extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          this.props.dispatch({
            type: 'signIn',
            payload: user
          })
        }
      }
      else {
        this.props.dispatch({
          type: 'signOut',
          payload: null
        })
      }
    });
  }
  render() {
    const { user } = this.props
    return (
      <div>
        <Switch>
          {user !== null ? <AppContaner /> : <SignInContainer />}
      </Switch>
      </div>
    )
  }
}
function mapStatetoProps(state) {
  return {
    user: state.user,
    isLogin: state.isLogin
  }
}

export default connect(mapStatetoProps)(App);
