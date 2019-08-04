import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import SideBar from './components/sidebar/SideBar';
import Content from './components/content/Content';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [isOpen, setOpen] = useState(true)
  const toggle = () => setOpen(!isOpen)

  return (
    <div>
    <Router>
      <div className="App wrapper">
        <SideBar toggle={toggle} isOpen={isOpen}/>
        <Content toggle={toggle} isOpen={isOpen}/>
      </div>
      
    </Router>

    </div>

  );
}

export default App;
