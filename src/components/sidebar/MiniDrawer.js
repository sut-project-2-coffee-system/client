import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Switch, Route } from 'react-router-dom';
import OrderMain from '../../pages/order/OrderMain';
import { Redirect,withRouter,Link } from 'react-router-dom'
import PeopleIcon from '@material-ui/icons/PeopleOutlineRounded';
import HomeIcon from '@material-ui/icons/HomeSharp'
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenuRounded'
import CashierIcon from '@material-ui/icons/ShoppingCartRounded'
import { connect } from 'react-redux'
import Member from '../../pages/member/Member'
import './Appbar.css'
import Cashier from '../../pages/cashier/Cashier';
import History from '../../pages/history/History'
import Menu from '../../pages/menu/Menu'
import HistoryIcon from '@material-ui/icons/History'
import Filter9PlusIcon from '@material-ui/icons/Filter9Plus';
import PromotionIcon from '@material-ui/icons/EventAvailableOutlined';
import Promotion from '../../pages/promotion/Promotion'
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import createOverrides from '../../theme';
import Button from '@material-ui/core/Button';
import firebase from '../../Firebase'

const baseTheme = createMuiTheme();

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function MiniDrawer({sideBarName,dispatch,props}) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    function handleDrawerOpen() {
        setOpen(true);
    }

    function handleDrawerClose() {
        setOpen(false);
    }

    function signOut(e){
        e.preventDefault()
        firebase.auth().signOut().then(function() {
        }).catch(function(error) {
            console.log(error.message)
        });
    }

    return (
        <ThemeProvider
        theme={{
          ...baseTheme,
          overrides: createOverrides(baseTheme)
        }}>
        <div className={classes.root}>
        
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {sideBarName}
          </Typography>
          <Button variant="outlined" size="medium" color="primary" onClick={signOut} style={{marginLeft: 'auto'}}>
                                    LOGOUT
                                </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem component={Link} to="/">
                        <ListItemIcon><HomeIcon style={{fontSize: 40}}/></ListItemIcon>
                        <ListItemText primary="Home" ></ListItemText>
                    </ListItem>
                    <ListItem component={Link} to="/cashier">
                        <ListItemIcon><CashierIcon style={{fontSize: 40}}/></ListItemIcon>
                        <ListItemText primary="cashier" ></ListItemText>
                    </ListItem>
                    <ListItem component={Link} to="/order">
                        <ListItemIcon><Filter9PlusIcon style={{fontSize: 40}}/></ListItemIcon>
                        <ListItemText primary="order" ></ListItemText>
                    </ListItem>
                    <ListItem component={Link} to="/menu">
                        <ListItemIcon><RestaurantMenuIcon style={{fontSize: 40}}/></ListItemIcon>
                        <ListItemText primary="menu" ></ListItemText>
                    </ListItem>
                    <ListItem component={Link} to="/member">
                        <ListItemIcon><PeopleIcon style={{fontSize: 40}}/></ListItemIcon>
                        <ListItemText primary="member" ></ListItemText>
                    </ListItem>
                    <ListItem component={Link} to="/promotion">
                        <ListItemIcon><PromotionIcon style={{fontSize: 40}}/></ListItemIcon>
                     <ListItemText primary="promotion" ></ListItemText>
                    </ListItem>
                    <ListItem component={Link} to="/history">
                        <ListItemIcon><HistoryIcon style={{fontSize: 40}}/></ListItemIcon>
                     <ListItemText primary="history" ></ListItemText>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/home" />} />
                    <Route exact path="/Order"  render={(props) => <OrderMain {...props} title={"Order Page"} sideBarName={(name) => dispatch({ type: 'sideBarName', payload: name })}/>}/>
                    <Route exact path="/Member" render={(props) => <Member {...props} title={"Member Page"} sideBarName={(name) => dispatch({ type: 'sideBarName', payload: name })}/>}/>
                    <Route exact path="/menu" render={(props) => <Menu {...props} title={"Menu Page"} sideBarName={(name) => dispatch({ type: 'sideBarName', payload: name })}/>}/>
                    <Route exact path="/Cashier" render={(props) => <Cashier {...props} title={"Cashier Page"} sideBarName={(name) => dispatch({ type: 'sideBarName', payload: name })}/>}/>
                    <Route exact path="/history" render={(props) => <History {...props} title={"History Page"} sideBarName={(name) => dispatch({ type: 'sideBarName', payload: name })}/>}/>
                    <Route exact path="/promotion" render={(props) => <Promotion {...props} title={"Promotion Page"} sideBarName={(name) => dispatch({ type: 'sideBarName', payload: name })}/>}/>
                    <Route exact path="/contact" component={() => "Contact"} />
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
            </main>
        </div>
        </ThemeProvider>
    );
}


function mapStatetoProps(state) {
    return {
        sideBarName: state.sideBarName,
    }
}

export default withRouter(connect(mapStatetoProps)(MiniDrawer))
