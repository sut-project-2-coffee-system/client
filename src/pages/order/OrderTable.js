import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';

const TAX_RATE = 0.07;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit,note) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price, note };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}



let rows = [
  createRow('Paperclips (Box)', 100, 1.15,''),
  createRow('Paper (Case)', 10, 45.99,''),
  createRow('Waste Basket', 2, 17.99,''),
];

let invoiceSubtotal = subtotal(rows);
let invoiceTaxes = TAX_RATE * invoiceSubtotal;
let invoiceTotal = invoiceTaxes + invoiceSubtotal;

function OrderTable(props) {
  const classes = useStyles();

  function setRow(menuList,orderList) {
    rows = []
    orderList.forEach(orderListItem => {
      menuList.forEach(menuListItem => {
        if(menuListItem.key === orderListItem.key){
          rows.push(createRow(menuListItem.name, orderListItem.amount, menuListItem.price,orderListItem.note))
        }
      })
    });
      
      invoiceSubtotal = subtotal(rows);
      invoiceTaxes = TAX_RATE * invoiceSubtotal;
      invoiceTotal = invoiceTaxes + invoiceSubtotal;
  }

  if(props.menu && Object.keys(props.menuList).length > 0){
        setRow(props.menuList,props.menu.orderList)
  }
  return (
    <div>

      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Desc</TableCell>
            <TableCell align="right">Note</TableCell>
            <TableCell align="right">จำนวน</TableCell>
            <TableCell align="right">ราคา</TableCell>
            <TableCell align="right">ราคารวม</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.desc}>
              <TableCell>{row.desc}</TableCell>
              <TableCell align="right">{row.note}</TableCell>
              <TableCell align="right">{row.qty}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{ccyFormat(row.price)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell colSpan={2} align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

    </div>
  );
}

const mapStateToProps = function(state) {
  return {
    totalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(OrderTable);