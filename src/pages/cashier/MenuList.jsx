import React, { Component } from 'react'
import MenuCard from './MenuCard'
import { Grid } from '@material-ui/core';
import { loadmenu } from '../../actions'
import { connect } from 'react-redux'
import { storeShoppingCart } from '../../actions'
import { storeStatusOrderCalDrwer } from '../../actions'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//let menuSelectList = []
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}
class MenuList extends Component {
    constructor(props) {
        super(props);
        this.state = { value: 0 };
    }

    componentDidMount() {
        this.props.dispatch(loadmenu())
    }


    menuSelect(data) {
        //console.log(this.props.menuList);

        let indexData = null
        if (this.props.shoppingCart.arr !== undefined) {
            this.props.shoppingCart.arr.find((cur, i) => {
                if (cur.key === data.key)
                    indexData = i
                return cur.key === data.key
            })
        }
        //console.log(this.props.shoppingCart.arr);

        //console.log(indexData);
        if (indexData == null) {
            data.amount = 1
            //this.props.menuList[data.no].amount = data["amount"]
            //menuSelectList.push(data)
            this.props.dispatch(storeShoppingCart(data))
        }
        else {
            data.amount += 1
            //this.props.menuList[data.no].amount = menuSelectList[indexData].amount
            this.props.dispatch({ type: "addAmount", "i": indexData, "data": data })
            //menuSelectList = []
        }
        //console.log(menuSelectList);
        //this.props.dispatch(storeShoppingCart(menuSelectList))
        //menuSelectList = []
        this.props.dispatch(storeStatusOrderCalDrwer(true))
        this.forceUpdate();

    }

    getShoppingAmount = (data) => {
        if (data !== undefined || null) {


            /* let datakey = this.props.shoppingCart.arr.find((cur, i) => {
                return data.key === cur.key
            }) */
            if (this.props.shoppingCart.arr !== undefined || null) {
                let datakey = null
                this.props.shoppingCart.arr.find((cur, i) => {
                    if (data.key === cur.key)
                        datakey = i
                    return data.key === cur.key
                })
                if (datakey !== null) {
                    return this.props.shoppingCart.arr[datakey].amount

                }

            }



            //console.log(this.props.shoppingCart.arr[key], key);
            //if (this.props.shoppingCart.arr[datakey] === undefined || null)
            //    return 0
            // else
            //    return this.props.shoppingCart.arr[datakey].amount 
        }
        else
            return 0
    }
    handleChange = (x, data) => {
        this.setState({ value: data })
    };
    TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                <Box p={3}>{children}</Box>
            </Typography>
        );
    }
    render() {
        let { menuList } = this.props;
        //console.log(this.props.shopingCart);
        //console.log(menuList);

        return (
            <div style={{ flexGrow: 1 }}>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    style={{ marginBottom: "15px" }}
                >
                    <Tab label="กาแฟ" />
                    <Tab label="อื่นๆ" />
                </Tabs>
                <TabPanel value={this.state.value} index={0}>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            {menuList.map((cur, i) => {
                                 return cur.isCoffee && (
                                    <Grid item xs={4} key={i}>
                                        <MenuCard menuName={cur.name} imgUrl={cur.image} price={cur.price} amount={this.getShoppingAmount(cur)} onClick={this.menuSelect.bind(this, cur)}></MenuCard>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            {menuList.map((cur, i) => {
                                 return !cur.isCoffee && (
                                    <Grid item xs={4} key={i}>
                                        <MenuCard menuName={cur.name} imgUrl={cur.image} price={cur.price} amount={this.getShoppingAmount(cur)} onClick={this.menuSelect.bind(this, cur)}></MenuCard>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
            </TabPanel>

            </div>
        )
    }


}
function mapStatetoProps(state) {
    return {
        menuList: state.menuList,
        shoppingCart: state.shoppingCart,
    }
}


export default connect(mapStatetoProps)(MenuList)