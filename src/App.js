import React from 'react';
import './App.css';
import Home from './pages/Home';
import { Route,Switch } from 'react-router-dom'
import Member from './pages/Member';

function App() {
  
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/member" component={Member}></Route>
      </Switch>
    </div>
    
  );
}

export default App;
