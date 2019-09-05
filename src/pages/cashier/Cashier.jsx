import React, { useState, useEffect } from 'react'
import MenuList from './MenuList'
import OrderCal from './OrderCal'
import { Grid } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import { connect } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles';


const drawerWidth = 330;
const useStyles = makeStyles(() =>
    createStyles({
        drawerPaper: {
            width: drawerWidth,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        content: {
            marginRight: 0,
        },
        contentShift: {

            marginRight: drawerWidth,
        }
    }),
);


function Cashier(props) {

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    const classes = useStyles();
    const [windowHeight, setWindowHeight] = useState(0);

    let resizeWindow = () => {
        setWindowHeight(window.innerHeight);
    };


    return (
        <div>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: props.handleDrawerOrderCal,
                })}
            >
                <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start">
                    <Grid item xs={12} >
                        {/* <Paper className={classes.paper}>Paper</Paper> */}
                        <GridList style={{ width: "100%", height: windowHeight * 0.78, padding: 20 }}>
                            <MenuList />
                        </GridList>
                    </Grid>
                </Grid>
            </main>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                open={props.handleDrawerOrderCal}
                anchor="right"
                style={{ width: 400, flexShrink: 0 }}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <br /><br /><br /><br />
                <OrderCal />
            </Drawer>
        </div>
    )
}

function mapStatetoProps(state) {
    return {
        handleDrawerOrderCal: state.handleDrawerOrderCal
    }
}
export default connect(mapStatetoProps)(Cashier)