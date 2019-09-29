import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OrderTable from '../order/OrderTable'
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import firebase from '../../Firebase'
import { loadmenu } from '../../actions'


const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(2),
    },
    divider: {
        margin: theme.spacing(2, 2),
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FullScreenDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState(0);
    let totalPrice = 0;

    useEffect(() => {
        props.dispatch(loadmenu())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }
    function handleChangeInput(event) {
        setInput(event.target.value)
    }

    function onSave() {
        let orderTarget
        firebase.database().ref(`order/${props.order.key}`).on('value', function (snapshot) {
            orderTarget = snapshot.val()
            orderTarget.pay = 'จ่ายแล้ว'
            orderTarget.timestamp = Date.now()
        });
        firebase.database().ref(`order/${props.order.key}`).update(orderTarget)

        firebase.database().ref('member').child(orderTarget.lineProfile).once('value', function (snapshot) {
            let point = orderTarget.total >= 20 ? Math.floor(orderTarget.total / 20) : 0
            firebase.database().ref('member').child(orderTarget.lineProfile).update({
              point : snapshot.val().point + point
            })
          })
        setOpen(false);
    }

    function CalTotalPrice(menuList, orderList) {
        totalPrice = 0
        orderList.forEach(orderListItem => {
            menuList.forEach(menuListItem => {
                if (menuListItem.key === orderListItem.key) {
                    totalPrice += menuListItem.price * orderListItem.amount
                }
            })
        });
    }


    if (props.order && Object.keys(props.menuList).length > 0) {
        CalTotalPrice(props.menuList, props.order.orderList)
    }

    return (
        <div>
            <IconButton aria-label="navigation" color="primary" className={classes.margin} onClick={handleClickOpen}>
                <Icon >send</Icon>
            </IconButton>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            จ่ายเงิน
                        </Typography>
                        <Button color="inherit" onClick={onSave}>
                            save
                         </Button>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Paper className={classes.paper} style={{ minHeight: 300 }}>
                                <OrderTable ></OrderTable>
                            </Paper>
                        </Grid>
                        <Grid item xs={8} >
                            <Paper className={classes.paper} style={{ minHeight: 332 }}>
                                <Grid container spacing={2}>
                                    {[1, 2, 5, 10, 20, 50, 100, 500, 1000].map((item, index) => {
                                        return <Grid item xs={4} key={index}>
                                            <Button fullWidth variant="outlined" style={{ minHeight: 55 }}size="large" color="primary" onClick={() => setInput(Number(input) + item)}>
                                                {item}
                                            </Button>
                                        </Grid>
                                    })}
                                    <Grid item xs={8} >
                                        <Button fullWidth variant="outlined" size="large" color="primary" onClick={() => setInput(0)}>
                                            <TextField id="outlined-full-width" label="รับเงินมา" style={{ margin: 4 }} placeholder="Type your Input" onChange={handleChangeInput}
                                                fullWidth margin="normal" variant="outlined" type="number"
                                                inputProps={{ min: "0", max: "100", step: "1" }}
                                            />
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4} >
                                        <Button fullWidth variant="outlined" size="large" color="primary" style={{ minHeight: 83 }} onClick={() => setInput(0)}>
                                            C
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={4} >
                            <Paper className={classes.paper} style={{ minHeight: 332 }}>
                                <Typography style={{ fontSize: 20 }} color="textSecondary" gutterBottom>
                                    รับเงินมา: {input}
                                </Typography>
                                <Typography style={{ fontSize: 20 }} color="textSecondary" gutterBottom>
                                    ราคารวม: {totalPrice}
                                </Typography>
                                <Typography style={{ fontSize: 20 }} color="textSecondary" gutterBottom>
                                    ทอน: {(input - totalPrice).toFixed(2)}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </main>
            </Dialog>
        </div>
    );
}

const mapStateToProps = function (state) {
    return {
        totalPrice: state.totalPrice,
        menuList: state.menuList
    }
}

export default connect(mapStateToProps)(FullScreenDialog);



