import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = {
    root: {
        flexGrow: 1,
    },
}

class OrderSelect extends Component {
    render() {
        const { orderselect } = this.props

        if (!orderselect) 
            return <h1>loading........</h1>
        
        return (
            <Fragment>
                {orderselect.key}
                {orderselect.location1}
                {orderselect.location2}
                {console.log(orderselect)}
            </Fragment>
        )
    }
}

OrderSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderSelect)
