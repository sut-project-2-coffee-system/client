import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class Qr extends Component {

    state = {
        legacyMode: false
    }
    handleScan = data => {
        if (data) {
            this.props.scan(data)
        }
    }
    handleError = err => {
        console.error(err)
    }
    openImageDialog = () => {
        this.refs.qrReader1.openImageDialog()
    }
    render() {
        return (
            <div>
                <QrReader
                    ref="qrReader1"
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                    legacyMode={this.state.legacyMode}/>
                <FormGroup row>
                    <FormControlLabel label="legacyMode" labelPlacement="top"
                        control={
                            <Switch
                                checked={this.state.legacyMode}
                                onChange={() => { 
                                    this.setState((prevState) => ({ 
                                        legacyMode: !prevState.legacyMode 
                                    })) 
                                    this.props.scan('')
                                }}
                                value={this.state.legacyMode}
                                size="medium"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                                color="primary" />} />
                </FormGroup>
                {this.state.legacyMode === true &&
                    <Button onClick={this.openImageDialog} variant="outlined" size="medium" color="primary">Insert qr</Button>
                }
            </div>
        )
    }
}