import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { DialogTitle, DialogContent, DialogActions } from '../../components/dialog/CustomDialog'
import Qr from './Qr'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

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
        else {
            setResult('')
        }
    }
    const handleSave = () => {
        if (result)
            props.onScanUser(result)
        setOpen(false);
    }

    const RenderUserInfo = () => {
        let user = JSON.parse(result)
        return (
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Avatar alt="Remy Sharp" src={user.pictureUrl} style={{ margin: 6, width: 60, height: 60 }} />
                </Grid>
                <Grid item xs={9}>
                    <Typography >
                        displayName: {user.displayName}
                    </Typography>
                    <Typography >
                        point: {user.point}
                    </Typography>
                </Grid>
            </Grid >
        )
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
                <DialogContent dividers style={{ minWidth: 300, minHeight: 1 }} >
                    {result === '' ? <Qr scan={setScanResult}></Qr> : <RenderUserInfo />}
                </DialogContent>
                <DialogActions>
                    {result !== '' &&
                        <Button onClick={() => setResult('')} color="primary">
                            Scan again
                        </Button>
                    }
                    <Button onClick={handleSave} color="primary">
                        Save changes
                     </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default QrCodeReader;
