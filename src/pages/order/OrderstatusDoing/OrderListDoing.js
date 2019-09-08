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

    handleClick =(item,index) => {
        this.props.onSelectOrder(index)
    }

    render() {
        const { orders,classes,orderSelect } = this.props
        return (
            <div>
                {orders.map((item,index) => {
                    return (    
                            <ListItem key={item.index} alignItems="flex-start" divider button   selected={orderSelect === index} onClick={() => this.handleClick(item,index)}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src={item.userImage} />
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