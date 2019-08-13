import React, { Component } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import '../Order.css'

const styles = {
    root: {
        flexGrow: 1,
    },
}

class OrderList extends Component {

    handleClick =(item) => {
        this.props.onSelectOrder(item)
    }

    render() {
        const { orders,classes,orderSelect } = this.props
        return (
            <div>
                {orders.map(item => {
                    return (    
                            <ListItem key={item.key} alignItems="flex-start" divider button   selected={orderSelect === item.no} onClick={() => this.handleClick(item)}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src="https://lh3.googleusercontent.com/-c9ZIXNb2I_M/XLBId31csII/AAAAAAAAABM/6Uf6kEzqNpEoxeB8CncJ89mPeiXmM815gCEwYBhgL/w140-h140-p/40273343.jpg" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={"ออเดอร์ที่: "+ (item.no+1)}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary">
                                                สั่งโดยคุณ : {item.orderBy}<br />
                                                เบอร์ติดต่อ : {item.tel}<br />
                                                จำนวน : {Object.keys(item.orderList).length} รายการ
                                            </Typography>
                                        </React.Fragment>
                                    } />
                            </ListItem>
                    );
                })}
            </div>
        )
    }
}

OrderList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderList)