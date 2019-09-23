import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { loadOrderByStatus, loadmenu, loadMember } from '../../../actions'
import OrderList from './OrderListWait'
import OrderCard from './OrderCard'
import OrderTable from '../OrderTable'

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
        height: 550,
    },
    slectedItemStyle: {
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

class OrderWait extends Component {

    componentDidMount() {
        this.props.dispatch(loadOrderByStatus('wait', 'loadOrderByStatusWait'))
        this.props.dispatch(loadmenu())
        this.props.dispatch(loadMember())
    }

    render() {
        let { classes, OrderByStatusWait, dispatch, orderSelectWait, menuList, memberList } = this.props;
        return (
            <Fragment>
                <div className={classes.root}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={3}>
                            <Paper className={classes.paperleft} >
                                <List className={classes.root}>
                                    <OrderList orders={OrderByStatusWait} memberList={memberList} orderSelect={orderSelectWait} onSelectOrder={(item) => dispatch({ type: 'orderSelectWait', payload: item })}></OrderList>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={9} >
                            <Paper className={classes.paperright}>
                                <OrderCard orderselect={OrderByStatusWait[orderSelectWait]}  memberList={memberList}></OrderCard>
                                <OrderTable menuList={menuList} menu={OrderByStatusWait[orderSelectWait]} />
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
        OrderByStatusWait: state.OrderByStatusWait,
        orderSelectWait: state.orderSelectWait,
        menuList: state.menuList,
        memberList: state.memberList
    }
}

OrderWait.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStatetoProps)(withStyles(styles)(OrderWait));
