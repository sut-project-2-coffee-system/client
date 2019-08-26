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
import { storeShoppingCart } from '../../actions'
let order = {
    "orderBy": "",
    "orderKeyList": [],
    "location1": "",
    "location2": "",
    "tel": "",
    "lineProfile": {
        "displayName": "",
        "pictureUrl": "https://image.dek-d.com/27/0393/3339/116833916",
        "statusMessage": "",
        "userId": ""
    },
    "pay": "จ่ายแล้ว",
    "timestamp": 0,
    "status": "wait"
}


class OrderCal extends Component {

    componentDidMount() {
        this.props.dispatch(storeShoppingCart())
    }
    constructor(props) {
        super(props)

        this.state = {
            order: [],

            orderTotal: 0
        }
    }
    calTotal = () => {
        let total = 0
        this.props.shoppingCart.arr.map((cur, i) => {
            total = (Number(cur.price) * Number(cur.amount)) + total
        })
        return total
    }
    handleClick = () => {
        order.orderBy = "Unknow"
        order.timestamp = Date.now()

        this.props.shoppingCart.arr.map((cur, i) => {
            order.orderKeyList.push(
                {
                    "key": cur.key,
                    "amount": cur.amount,
                    "note": ""
                }
            )
        })
        if (order.orderKeyList != []) {
            firebase.database().ref("order").push({
                ...order
            })
            order.orderKeyList = []
        }
        else
            alert("ไม่สามารถเพิ่มได้")


        this.props.dispatch({ type: "clearOrder" })
        //this.props.dispatch({type:"RESET_MENU_LIST_AMOUNT"})
        console.log(this.props.menuList);

    }
    render() {
        let date = new Date();
        let { shoppingCart, dispatch } = this.props
        if (shoppingCart.arr == undefined || null)
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
                                                    shoppingCart.arr[i].amount++
                                                    this.props.dispatch({ type: "addAmount", "i": i, "arr": shoppingCart.arr[i] })
                                                }}>
                                                    +
                                                </Button>
                                                <Chip label={cur.amount} variant="outlined"></Chip>
                                                <Button color="secondary" onClick={(e) => {
                                                    shoppingCart.arr[i].amount--
                                                    this.props.dispatch({ type: "addAmount", "i": i, "arr": shoppingCart.arr[i] })
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
        menuList: state.menuList
    }
}
export default connect(mapStatetoProps)(OrderCal)