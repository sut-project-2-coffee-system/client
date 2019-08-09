import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux'

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

    changeTab = (event, tabValue) => {
        this.setState({ tabValue });
    };

    render() {
        const { classes } = this.props;

        let itemList = [0, 1, 2, 3, 4, 5, 6].map(sectionId => (
            <React.Fragment key={sectionId.toString()}>
                <ListItem alignItems="flex-start" button>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="https://lh3.googleusercontent.com/-c9ZIXNb2I_M/XLBId31csII/AAAAAAAAABM/6Uf6kEzqNpEoxeB8CncJ89mPeiXmM815gCEwYBhgL/w140-h140-p/40273343.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary">
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }/>
                </ListItem>
                <Divider />
            </React.Fragment>
        ))
        return (
            <Fragment>
                <div className={classes.root}>
                    <Grid container spacing={3} >
                        <Grid item xs={12} sm={3}>
                            <Paper className={classes.paperleft} >
                                <List className={classes.root}>
                                    {itemList}
                                </List>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={9} >
                            <Paper className={classes.paperright}>
                                <Tabs
                                    value={this.props.tabValue}
                                    onChange={this.changeTab}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example">

                                    <Tab value={0} onClick={this.props.tab0} label="Item One" />
                                    <Tab value={1} onClick={this.props.tab1} label="Item Two" />
                                </Tabs>
                                {this.props.tabValue === 0 && <TabContainer>Item One</TabContainer>}
                                {this.props.tabValue === 1 && <TabContainer>Item Two</TabContainer>}
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        )

    }
}

function mapStatetoProps(state){
    return {
        tabValue: state.tabValue
    }
}

function mapDispatchToProps(dispatch){
    return {
        tab0: () => {
            dispatch({type: 'tab0'})
        },
        tab1: () => {
            dispatch({type: 'tab1'})
        }
    }
}

Order.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStatetoProps,mapDispatchToProps)(withStyles(styles)(Order));
