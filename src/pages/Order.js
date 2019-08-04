import React, { Component,Fragment } from 'react'
import firebase from '../Firebase'
import MUIDataTable from "mui-datatables";

export default class Order extends Component {
    constructor(){
        super();

        this.state = {
           items:[],
        }
    }

    componentDidMount() {
     const itemsRef = firebase.database().ref('order');
     itemsRef.on('value',(snapshot) => {
        let items = snapshot.val();
        let newState = [];
        let index = 1;
        for(let item in items){
           newState.push({
              no:index,
              order_list:items[item].order_list,
              order_by:items[item].order_by,
              price:items[item].price,
              status: items[item].status
           })
           index++;
        }
        this.setState({
           items:newState
        })
     })
  }

    render() {
        const columns = ["no","order_list", "price", "order_by","status"];

        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            selectableRowsOnClick: true
        };

        return (
            <Fragment>
                <MUIDataTable
                    title={"Order list"}
                    data={this.state.items}
                    columns={columns}
                    options={options}
                />
            </Fragment>

        );
    }
}