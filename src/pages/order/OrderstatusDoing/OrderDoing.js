import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { loadOrderByStatus, loadmenu,loadMember } from '../../../actions'
import OrderList from './OrderListDoing'
import OrderTable from '../OrderTable'
import OrderCard from './OrderCard'

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

class OrderDoing extends Component {

    componentDidMount() {
        // document.title = this.props.title
        // this.props.sideBarName(this.props.title)
        this.props.dispatch(loadOrderByStatus('doing','loadOrderByStatusDoing'))
        this.props.dispatch(loadmenu())
        this.props.dispatch(loadMember())
    }

    render() {
        let { classes, OrderByStatusDoing, dispatch, orderSelectDoing, menuList,memberList } = this.props;
        return (
            <Fragment>
                <div className={classes.root}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} sm={3}>
                            <Paper className={classes.paperleft} >
                                <List className={classes.root}>
                                    <OrderList orders={OrderByStatusDoing} orderSelect={orderSelectDoing} memberList={memberList} onSelectOrder={(item) => dispatch({ type: 'orderSelectDoing', payload: item })}></OrderList>
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={9} >
                            <Paper className={classes.paperright}>
                                <OrderCard orderselect={OrderByStatusDoing[orderSelectDoing]} memberList={memberList}></OrderCard>
                                <OrderTable menuList={menuList} menu={OrderByStatusDoing[orderSelectDoing]} />
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
        OrderByStatusDoing: state.OrderByStatusDoing,
        orderSelectDoing: state.orderSelectDoing,
        menuList: state.menuList,
        memberList: state.memberList
    }
}

OrderDoing.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStatetoProps)(withStyles(styles)(OrderDoing));
