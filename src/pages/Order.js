import React, { Component, Fragment } from 'react'
import firebase from '../Firebase'
import MUIDataTable from "mui-datatables";
import { Button, Modal, ModalBody, ModalFooter, Label } from 'reactstrap';


const OrderEditModal = (props) => {
    return (
        <div>
            <Modal returnFocusAfterClose={props.focusAfterClose} isOpen={props.open} centered>
                <ModalBody>
                    {props.children}
                </ModalBody>
                <ModalFooter>
                    <Button outline color="danger" onClick={props.toggle}>Cancle</Button>
                    <Button outline type="submit" color="danger" onClick={props.updateFunction}>Update</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}


export default class Order extends Component {
    constructor() {
        super();

        this.state = {
            items: [],
            rowsSelected: [],
            open: false,
            focusAfterClose: true,
            indexRowClick: 0,
            order_list: '',
            order_by: '',
            price: '',
            status: ''
        }

        this.toggle = this.toggle.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.updateFunction = this.updateFunction.bind(this);
    }

    toggle() {
        this.setState(({ open }) => ({ open: !open }));
    }

    handleSelectChange({ target: { value } }) {
        this.setState({ focusAfterClose: JSON.parse(value) });
    }

    updateFunction(e) {
        e.preventDefault();
        var obj = { 
            order_by: this.state.order_by,
            order_list: this.state.order_list,
            price: this.state.price,
            status: this.state.status 
        };
        const itemsRef = firebase.database().ref('order');
        itemsRef.child(this.props.msgKey).update(obj)
            .then(() => this.toggle());
    }

    handleChange=(e)=>{
        const value = e.target.value
        const name = e.target.name
        this.setState({
            [name]: value
        })
        console.log(name , value)
    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('order');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            let index = 1;
            for (let item in items) {
                newState.push({
                    key: item,
                    no: index,
                    order_list: items[item].order_list,
                    order_by: items[item].order_by,
                    price: items[item].price,
                    status: items[item].status
                })
                index++;
            }
            this.setState({
                items: newState
            })
        })
    }
    render() {
        const columns = ["no", "order_list", "price", "order_by", "status"];

        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            // selectableRowsOnClick: true,
            rowsSelected: this.state.rowsSelected,
            onRowClick: (rowData, rowMeta) => {
                this.setState(({ open }) => ({ open: !open }));
                this.setState({
                    indexRowClick: rowMeta.dataIndex
                })
            },
            onRowsSelect: (rowsSelected, allRows) => {
                let index = allRows.map(row => row.dataIndex)
                localStorage.setItem('index', JSON.stringify(index));
            },
            onRowsDelete: (rowsDeleted) => {
                JSON.parse(localStorage.getItem('index')).forEach(element => {
                    firebase.database().ref('order').child(this.state.items[element].key).remove();
                })
                alert('deleted !!')
            },
        };
        let renderModal = this.state.items.map((item, i)=> {
            if( i === this.state.indexRowClick)
            return (
                <div key={i}>
                    <form onSubmit={this.updateFunction}>
                        <Label>รายการ:{item.order_list}</Label>
                        <input type="text" value={this.state.order_list} name="order_list" onChange={this.handleChange} placeholder={item.order_list} className="form-control" />
                        <Label>ผู้สั่ง:{item.order_by}</Label>
                        <input type="text" value={this.state.order_by} name="order_by" placeholder={item.order_by} onChange={this.handleChange} className="form-control" />
                        <Label>ราคา:{item.price}</Label>
                        <input type="text" value={this.state.price} name="price" placeholder={item.price} onChange={this.handleChange} className="form-control" />
                        <Label>สถานะปัจจุบัน: </Label><br></br>
                        <select name="status" onChange={this.handleChange} value={this.state.status} placeholder={item.status}>
                            <option value="doing">doing</option>
                            <option value="done">done</option>
                        </select>
                    </form>
                </div>
            ); else return null
        });
        return (
            <Fragment>
                <MUIDataTable
                    title={"Order list"}
                    data={this.state.items}
                    columns={columns}
                    options={options} />

                <OrderEditModal toggle={this.toggle} open={this.state.open} focusAfterClose={this.state.focusAfterClose} updateFunction={this.updateFunction} >
                    {renderModal}
                </OrderEditModal>
            </Fragment>
        );
    }
}