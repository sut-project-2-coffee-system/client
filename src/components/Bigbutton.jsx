import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import './mycss.css';
import Typography from '@material-ui/core/Typography';

export default class Bigbutton extends Component {
    render() {
        return (
            <div>
                <div className="rectangle" align="center">
                    <br/>
                    
                    <img src={this.props.img} alt="" width="75%" height="75%"/>
                </div>
                <br/>
                <Typography variant="h4" align="center">
                    <b style={{color:"#114B5F"}}>{this.props.text}</b>
                </Typography>
            </div>
        )
    }
}