import React, { Component } from 'react'
import MenuList from './MenuList'
import OrderCal from './OrderCal'
import { Grid } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';

export default class Cashier extends Component {
    render() {
        return (
            <div>
                <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start">
                    <Grid item xs={8} >
                        <GridList style={{width:"100%" , height:'650px', padding:20}}>
                            <MenuList />
                        </GridList>
                    </Grid>
                    <Grid item xs={4} >
                        <OrderCal />
                    </Grid>

                </Grid>
            </div>
        )
    }
}
