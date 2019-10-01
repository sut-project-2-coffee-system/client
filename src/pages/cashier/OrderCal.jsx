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
// import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import QrCodeReader from './QrCodeReader'


let order = {
    "orderBy": "",
    "orderKeyList": [],
    "location1": "",
    "location2": "",
    "tel": "",
    "lineProfile": '',
    "pay": "จ่ายแล้ว",
    "timestamp": 0,
    "status": "wait"
}


class OrderCal extends Component {

    componentDidMount() {
        //this.props.dispatch(storeShoppingCart())
        this.props.dispatch(loadPromotion())
    }
    componentWillUnmount() {
        this.props.dispatch({ type: "clearOrder" })
    }
    constructor(props) {
        super(props)

        this.state = {
            order: [],
            check: false, //percent
            discountCheck: false, //baht
            isUsePoint: false,
            orderTotal: 0,
            discountBaht: 0,
            discountPercent: 0,
            usePoint: 0,
            lineProfile: {
                "displayName": "",
                "pictureUrl": "",
                "point": 0,
                "statusMessage": "",
                "userId": ""
            },
        }
    }
    calTotal = () => {
        let total = 0
        this.props.shoppingCart.arr.forEach((cur, i) => {
            total = (Number(cur.price) * Number(cur.amount)) + total
        })
        let discountBaht = this.state.discountCheck && total >= this.state.discountBaht.buyTarget ? this.state.discountBaht.discount : 0
        let discountPercent = this.state.check  && total >= this.state.discountPercent.buyTarget ? this.state.discountPercent.discount : 0
        let discountWithPoint = this.state.isUsePoint && this.state.usePoint ? this.state.usePoint * 0.2 : 0
        return discountPercent === 0 ? total - discountBaht - discountWithPoint : (total - (total * discountPercent / 100) - discountBaht - discountWithPoint).toFixed(2)
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleClick = () => {
        let tempProfile = {
            "displayName": "",
            "pictureUrl": "",
            "point": 0,
            "statusMessage": "",
            "userId": ""
        }

        order.orderBy = "Unknow"
        order.timestamp = Date.now()
        order.total = this.calTotal()
        let usePoint = this.state.isUsePoint ? this.state.usePoint : 0
        let point = order.total >= 20 ? Math.floor(order.total / 20) : 0

        this.props.shoppingCart.arr.forEach((cur, i) => {
            order.orderKeyList.push(
                {
                    "key": cur.key,
                    "amount": cur.amount,
                    "note": ""
                }
            )
        })

        let lineProfile = this.state.lineProfile
        if (order.orderKeyList !== [] && lineProfile != null) {
            firebase.database().ref('member').orderByChild('userId').equalTo(lineProfile.userId).once('value', function (snapshot) {
                firebase.database().ref('member/').child(Object.keys(snapshot.val())[0]).update({
                    point: snapshot.val()[Object.keys(snapshot.val())[0]].point + point - usePoint
                })
                order.lineProfile = Object.keys(snapshot.val())[0]
                firebase.database().ref("order").push({
                    ...order
                })
                order.orderKeyList = []
            })
        }
        else
            alert("ไม่สามารถเพิ่มได้")

        this.setState({
            lineProfile: tempProfile,
            usePoint: 0,
            discountBaht: 0,
            discountPercent: 0,
            check: false,
            discountCheck: false, 
            isUsePoint: false,
        })
        this.props.dispatch({ type: "clearOrder" })
        this.props.dispatch(storeStatusOrderCalDrwer(false))
    }

    onScanUser = (result) => {
        let user = JSON.parse(result)
        this.setState({
            lineProfile: user
        })
    }

    render() {
        let date = new Date();
        let { shoppingCart, promotionList } = this.props

        const RenderUsePoint = () => {
            let profile = this.state.lineProfile
            let arr = []
            let round = profile.point >= 100 ? Math.floor(this.state.lineProfile.point / 100) : 0
            for (let i = 1; i <= round; i++) {
                arr.push(i * 100)
            }
            return (
                <FormControl style={{ margin: 1, width: '100%', }}>
                    <InputLabel htmlFor="age-simple">ใช้คะแนนสะสม</InputLabel>
                    <Select
                        value={this.state.usePoint}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'usePoint',
                            id: 'age-simple',
                        }}
                    >
                        {arr.map((item, index) => {
                            return <MenuItem key={index} value={item}>ใช้ {item} คะแนน ลด {item * 0.2} บาท</MenuItem>
                        })}
                    </Select>
                </FormControl>
            )
        }
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
                    <Divider variant="middle" />
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
                        {this.state.lineProfile.point >= 100 && this.state.lineProfile.userId !== "" &&
                            <FormControlLabel label="ใช้คะแนนสะสม" labelPlacement="top"
                                control={
                                    <Switch
                                        checked={this.state.isUsePoint}
                                        onChange={() => { this.setState((prevState) => ({ isUsePoint: !prevState.isUsePoint })) }}
                                        value={this.state.isUsePoint}
                                        size="medium"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        color="primary" />} />
                        }
                    </FormGroup>
                    {this.state.check === true &&
                        <FormControl style={{ margin: 1, width: '100%', }}>
                            <InputLabel htmlFor="age-simple">โปรโมชั่นลดเป็นเปอร์เซ็น</InputLabel>
                            <Select
                                value={this.state.discountPercent}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'discountPercent',
                                    id: 'age-simple',
                                }}
                            >
                                {promotionList.itemPercent.map((item, index) => {
                                    return <MenuItem key={index} value={item}>ซื้อครบ {item.buyTarget} บาท ลด {item.discount} เปอร์เซ็น</MenuItem>
                                })}
                            </Select>
                        </FormControl>}
                    <Divider variant="middle" />
                    <br></br>
                    {this.state.discountCheck === true &&
                        <FormControl style={{ margin: 1, width: '100%', }}>
                            <InputLabel htmlFor="age-simple">โปรโมชั่นลดเป็นบาท</InputLabel>
                            <Select
                                value={this.state.discountBaht}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'discountBaht',
                                    id: 'age-simple',
                                }}
                            >
                                {promotionList.itemBaht.map((item, index) => {
                                    return <MenuItem key={index} value={item}>ซื้อครบ {item.buyTarget} บาท ลด {item.discount} บาท</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    }
                    {this.state.isUsePoint === true && <RenderUsePoint />}
                    <Divider variant="middle" />
                    <br></br>
                    <Button fullWidth variant="outlined" size="medium" color="primary" onClick={this.handleClick}>
                        Add to Order
                    </Button>
                    <QrCodeReader onScanUser={this.onScanUser} />
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


