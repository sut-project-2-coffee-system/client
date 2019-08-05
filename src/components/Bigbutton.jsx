import React, { Component } from 'react'
import './mycss.css';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

export default class Bigbutton extends Component {
    render() {
        return (
            <div>
                <Link
                    component="button"
                    to={this.props.to}
>
                    <div className="rectangle" align="center">
                        <br />

                        <img src={this.props.img} alt="" width="75%" height="75%" />
                    </div>
                    <br />
                    <Typography variant="h4" align="center">
                        <b style={{ color: "#114B5F" }}>{this.props.text}</b>
                    </Typography>
                </Link>
            </div>
        )
    }
}