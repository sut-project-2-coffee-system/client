import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import { Route,Switch } from 'react-router-dom'
import  Home  from './pages/Home'
import { createStore,applyMiddleware } from 'redux'
import reducers from './reducers'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(reducers,applyMiddleware(thunk))

const HomeContainer = () => (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/home" component={Home} />
    </div>
)

ReactDOM.render(
    <Provider store={store}>
        <Router >
            <Switch>
                    <Route path="/home" component={HomeContainer} />
                    <Route component={App} />
            </Switch>
        </Router>
    </Provider>

    , document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();