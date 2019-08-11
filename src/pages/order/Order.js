import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { loadOrder } from '../../actions'
import OrderList from './OrderList'
import OrderSelect from './OrderSelect'

const styles = {
    root: {
        flexGrow: 1,
    },
    paperleft: {
        marginTop: 20,
        marginBottom: 20,
        overflow: 'auto',
        maxHeight: 550,
        height: 550
    },
    paperright: {
        marginTop: 20,
        marginBottom: 20,
        overflow: 'auto',
        maxHeight: 550,
        height: 550
    },
    slectedItemStyle:{
        backgroundColor: 'red'
    }
}

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class Order extends Component {
    
    componentDidMount() {
        this.props.dispatch(loadOrder())
    }

    render() {
        let { classes, orders, dispatch,orderSelect } = this.props;

        return (
            <Fragment>
                <div className={classes.root}>
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={3}>
                            <Paper className={classes.paperleft} >
                                <List className={classes.root}>
                                    <OrderList orders={orders}  orderSelect={orderSelect} onSelectOrder={(item) => dispatch({type: 'orderSelect',payload: item.no})}></OrderList>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={9} >
                            <Paper className={classes.paperright}>
                                <OrderSelect orderselect={orders[orderSelect]}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        )

    }
}

function mapStatetoProps(state) {
    return {
        tabValue: state.tabValue,
        orders: state.orders,
        orderSelect: state.orderSelect
    }
}

Order.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStatetoProps)(withStyles(styles)(Order));
