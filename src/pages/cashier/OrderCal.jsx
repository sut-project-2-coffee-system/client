import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import firebase from 'firebase'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { connect } from 'react-redux'
import { storeStatusOrderCalDrwer, loadPromotion } from '../../actions'
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';


let order = {
    "orderBy": "",
    "orderKeyList": [],
    "location1": "",
    "location2": "",
    "tel": "",
    "lineProfile": {
        "displayName": "",
        "pictureUrl": "https://firebasestorage.googleapis.com/v0/b/coffe-system-yiakpd.appspot.com/o/1.jpg?alt=media&token=57779667-a306-41fc-9504-230b3dbdf811",
        "statusMessage": "",
        "userId": ""
    },
    "pay": "จ่ายแล้ว",
    "timestamp": 0,
    "status": "wait"
}


class OrderCal extends Component {

    componentDidMount() {
        //this.props.dispatch(storeShoppingCart())
        this.props.dispatch(loadPromotion())
    }
    constructor(props) {
        super(props)

        this.state = {
            order: [],
            check: false,
            discountCheck: false,
            discount: 0,
            percent: 0,
            orderTotal: 0
        }
    }
    calTotal = () => {
        let total = 0
        this.props.shoppingCart.arr.forEach((cur, i) => {
            total = (Number(cur.price) * Number(cur.amount)) + total
        })
        return total - (total * this.state.percent / 100).toFixed(2) - this.state.discount
    }

    handleChangePercentDiscount = (event) => {
        this.setState({
            percent: event.target.value
        })
    }

    handleChangeDiscount = (event) => {
        this.setState({
            discount: event.target.value
        })
    }

    handleClick = () => {
        order.orderBy = "Unknow"
        order.timestamp = Date.now()

        this.props.shoppingCart.arr.forEach((cur, i) => {
            order.orderKeyList.push(
                {
                    "key": cur.key,
                    "amount": cur.amount,
                    "note": ""
                }
            )
        })
        if (order.orderKeyList !== []) {
            firebase.database().ref("order").push({
                ...order
            })
            order.orderKeyList = []
        }
        else
            alert("ไม่สามารถเพิ่มได้")


        this.props.dispatch({ type: "clearOrder" })
        this.props.dispatch(storeStatusOrderCalDrwer(false))
        //this.props.dispatch({type:"RESET_MENU_LIST_AMOUNT"})
        console.log(this.props.menuList);

    }
    render() {
        let date = new Date();
        let { shoppingCart } = this.props
        if (shoppingCart.arr === undefined || null)
            return null
        return (
            <div>
                <Paper style={{ padding: 20 }}>
                    <Typography variant="h4" >Order List <Chip label={shoppingCart.arr.length} variant="outlined"></Chip> </Typography>
                    <Typography color="textSecondary" variant="body2" gutterBottom>
                        {date.toLocaleString()}
                    </Typography>
                    <Divider variant="middle" />
                    <List>
                        {shoppingCart.arr.map((cur, i) => {
                            return (
                                <div key={i}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={cur.image} />
                                        </ListItemAvatar>
                                        <ListItemText primary={cur.name} secondary={`รวม: ${cur.price * cur.amount}`} />
                                        <ListItemSecondaryAction>
                                            <Typography variant="h6">
                                                <Button color="primary" onClick={(e) => {
                                                    cur.amount++
                                                    this.props.dispatch({ type: "addAmount", "i": i, "data": cur })
                                                }}>
                                                    +
                                                </Button>
                                                <Chip label={cur.amount} variant="outlined"></Chip>
                                                <Button color="secondary" onClick={(e) => {
                                                    cur.amount--
                                                    this.props.dispatch({ type: "addAmount", "i": i, "data": cur })
                                                    if (shoppingCart.arr.length === 0)
                                                        this.props.dispatch(storeStatusOrderCalDrwer(false))
                                                }}>
                                                    -
                                                </Button>
                                            </Typography>

                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </div>
                            )
                        })}
                    </List>
                    <Typography variant="h6">
                        ราคารวม {this.calTotal()}
                    </Typography>
                    <FormGroup row>
                        <FormControlLabel label="ส่วนลด(เปอร์เซ็น)" labelPlacement="top"
                            control={
                                <Switch
                                    checked={this.state.check}
                                    onChange={() => { this.setState((prevState) => ({ check: !prevState.check })) }}
                                    value={this.state.check}
                                    size="medium"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    color="primary" />} />
                    
                    <FormControlLabel label="ส่วนลด(บาท)" labelPlacement="top" 
                                control={
                                    <Switch
                                        checked={this.state.discountCheck}
                                        onChange={() => { this.setState((prevState) => ({ discountCheck: !prevState.discountCheck })) }}
                                        value={this.state.discountCheck}
                                        size="medium"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        color="primary" />} />
                    </FormGroup>
                    {this.state.check === true &&
                        <TextField id="outlined-full-width" type="number" min={0} label="เปอร์เซ็นส่วนลด" style={{ margin: 5 }} placeholder="เปอร์เซ็นส่วนลด เช่น 20" onChange={this.handleChangePercentDiscount}
                            fullWidth margin="normal" variant="outlined"
                            inputProps={{ min: "0", max: "100", step: "1" }} />}
                    <br></br>
                    {this.state.discountCheck === true &&
                        <TextField id="outlined-full-width" type="number" label="ส่วนลดเป็นบาท" style={{ margin: 5 }} placeholder="ส่วนลด(บาท) เช่น 20" onChange={this.handleChangeDiscount}
                            fullWidth margin="normal" variant="outlined"
                            inputProps={{ min: "0", max: "100", step: "1" }} />}
                    <Button fullWidth variant="outlined" size="medium" color="primary" onClick={this.handleClick}>
                        Add to Order
                    </Button>
                </Paper>
            </div>
        )
    }
}

function mapStatetoProps(state) {
    return {
        shoppingCart: state.shoppingCart,
        menuList: state.menuList,
        promotionList: state.promotionList
    }
}

export default connect(mapStatetoProps)(OrderCal)