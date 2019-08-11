import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { loadMenuSelect } from '../../actions'

const TAX_RATE = 0.07;


function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}

function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

 let rows = [
    createRow('Paperclips (Box)', 100, 1.15),
    createRow('Paper (Case)', 10, 45.99),
    createRow('Waste Basket', 2, 17.99),
]; 

let invoiceSubtotal = subtotal(rows);
let invoiceTaxes = TAX_RATE * invoiceSubtotal;
let invoiceTotal = invoiceTaxes + invoiceSubtotal;

function setRow(data) {
    rows = []
    data.forEach(cur => {
        rows.push(
            createRow(cur["desc"], cur["qty"], cur["price"])
        )
    });

    invoiceSubtotal = subtotal(rows);
    invoiceTaxes = TAX_RATE * invoiceSubtotal;
    invoiceTotal = invoiceTaxes + invoiceSubtotal;
    
}

const styles = {
    root: {
        flexGrow: 1,
    },
}

class OrderSelect extends Component {

    componentDidUpdate(prevProps) {
        //Typical usage, don't forget to compare the props
        if (this.props.orderselect !== prevProps.orderselect) {
            this.props.dispatch(loadMenuSelect(this.props.orderselect))
        }
        
    }

    componentWillReceiveProps(){
        setRow(this.props.menuInOrder)
    }

    
    render() {
        const { orderselect, classes , menuInOrder} = this.props
        
        if (!orderselect)
            return <h1>loading........</h1>

        // ค่าที่จะใช้แสดงปริ้นได้แต่เอามาmap ไม่ได้
        //console.log(menuInOrder)
        //console.log(rows);
        //setRow(menuInOrder)
        
        return (
            <Fragment>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Desc</TableCell>
                                <TableCell align="right">Qty.</TableCell>
                                <TableCell align="right">@</TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.desc}>
                                    <TableCell>{row.desc}</TableCell>
                                    <TableCell align="right">{row.qty}</TableCell>
                                    <TableCell align="right">{row.unit}</TableCell>
                                    <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell rowSpan={3} />
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tax</TableCell>
                                <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Fragment>
        )
    }
}

function mapStatetoProps(state) {
    return {
        menuInOrder: state.menuInOrder,
    }
}

OrderSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStatetoProps)(withStyles(styles)(OrderSelect))
