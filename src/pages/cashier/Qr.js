import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import firebase from '../../Firebase'

export default class Qr extends Component {

    state = {
        legacyMode: false
    }
    handleScan = data => {
        if (data) {
            const { scan } = this.props
            let user = JSON.parse(data)
            firebase.database().ref('member').orderByChild('userId').equalTo(user.userId).once('value',function (snapshot) {
                if (snapshot.val() === null) {
                    user.point = 0
                    firebase.database().ref("member").push(user).once('value').then((snap) => {
                        user.key = snap.key
                        scan(user)
                    })
                }
                else {
                    user.key = Object.keys(snapshot.val())[0]
                    user.point = snapshot.val()[Object.keys(snapshot.val())[0]].point
                    user.displayName = snapshot.val()[Object.keys(snapshot.val())[0]].displayName
                    user.pictureUrl = snapshot.val()[Object.keys(snapshot.val())[0]].pictureUrl
                    scan(user)
                }
            })
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
                    style={{ width: '400px', height: '400px' }}
                    legacyMode={this.state.legacyMode} />
                <FormGroup row>
                    <FormControlLabel label="คลังรูปภาพ" labelPlacement="top"
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
                    <Button onClick={this.openImageDialog} variant="outlined" size="medium" color="primary">Insert Qrcode</Button>
                }
            </div>
        )
    }
}