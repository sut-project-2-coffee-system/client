import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Slide from '@material-ui/core/Slide';
import Member from '../../pages/member/Member'
import Menu from '../../pages/menu/menu'
import History from '../../pages/history/History'
import OrderMain from '../../pages/order/OrderMain';
import { Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function HideAppBar(props,dispatch) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6">Scroll to Hide App Bar</Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar />
            <Container maxWidth>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/home" />} />
                    <Route exact path="/Order" render={(props) => <OrderMain {...props} title={"Order Page"} sideBarName={(name) => dispatch({ type: 'sideBarName', payload: name })} />} />
                    <Route exact path="/Member" render={(props) => <Member {...props} title={"Member Page"} sideBarName={(name) => dispatch({ type: 'sideBarName', payload: name })} />} />
                    <Route exact path="/menu" render={(props) => <Menu {...props} title={"Menu Page"} sideBarName={(name) => dispatch({ type: 'sideBarName', payload: name })} />} />
                    <Route exact path="/history" render={(props) => <History {...props} title={"History Page"} sideBarName={(name) => dispatch({ type: 'sideBarName', payload: name })} />} />
                    <Route exact path="/Home-1" component={() => "Home-1"} />
                    <Route exact path="/Home-2" component={() => "Home-2"} />
                    <Route exact path="/Home-3" component={() => "Home-3"} />
                    <Route exact path="/Page-1" component={() => "Page-1"} />
                    <Route exact path="/Page-2" component={() => "Page-2"} />
                    <Route exact path="/page-1" component={() => "page-1"} />
                    <Route exact path="/page-2" component={() => "page-2"} />
                    <Route exact path="/page-3" component={() => "page-3"} />
                    <Route exact path="/page-4" component={() => "page-4"} />
                </Switch>
            </Container>
        </React.Fragment>
    );
}