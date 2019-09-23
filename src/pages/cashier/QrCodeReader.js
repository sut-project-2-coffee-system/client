import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { DialogTitle, DialogContent, DialogActions } from '../../components/dialog/CustomDialog'
import Qr from './Qr'

const QrCodeReader = (props) => {
    const [open, setOpen] = React.useState(false);
    const [result, setResult] = React.useState('')

    const handleClickOpen = () => {
        setResult('')
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const setScanResult = (data) => {
        if (data) {
            setResult(data)
        }
        else{
            setResult('')
        }
    }
    const handleSave = () =>{
        if(result)
            props.onScanUser(result)
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen} fullWidth>
                SCAN QR CODE
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Qr reader
                </DialogTitle>
                <DialogContent dividers style={{minWidth: 300,minHeight: 1}} >
                        <Qr scan={setScanResult}></Qr>
                    <Typography gutterBottom>
                        {result}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave} color="primary">
                        Save changes
                     </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default QrCodeReader;
