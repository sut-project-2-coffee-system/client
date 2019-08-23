import React, { Component } from 'react'
import MaterialTable from 'material-table';
import { connect } from 'react-redux'
// import firebase from '../../Firebase'
import { loadOrderByStatus, loadmenu } from '../../actions'
import OrderTable from '../order/OrderTable'


class History extends Component {
    state = {
        selectedRow: null
    }

    componentDidMount(){
        this.props.dispatch(loadOrderByStatus('done','loadOrderByStatusDone'))
        this.props.dispatch(loadmenu())
    }

    render() {
        const {OrderByStatusDone,menuList} = this.props
        if(!OrderByStatusDone)
            return <h1> loading </h1>
        return (
          <MaterialTable
            title="Order History"
            columns={[
                {
                    title: 'Avatar',
                    field: 'avatar',
                    render: rowData => (
                      <img
                        style={{ height: 36, borderRadius: '50%' }}
                        alt="User propfile"
                        src={rowData.userImage}
                      />
                    ),
                },
                { title: 'Name', field: 'orderBy' },
                { title: 'เบอร์โทรศํพท์', field: 'tel' },
                {
                  title: 'สถานะ',
                  field: 'pay',
                },
                // {
                //     title: 'จำนวน',
                //     field: 'amount',
                //     render: rowData => (
                //         <p>{Object.keys(rowData.orderList).length}</p>
                //     ),
                // },
            ]}
            data={OrderByStatusDone}
            detailPanel={rowData => {
              return (
                <OrderTable menuList={menuList} menu={rowData} />
              )
            }}
            onRowClick={(event, selectedRow, togglePanel) => {togglePanel() ;this.setState({ selectedRow })}}
            options={{
                rowStyle: rowData => ({
                  backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#8187ff' : '#8187ff'
                }),
                headerStyle: {
                    backgroundColor: '#0031ca',
                    color: '#FFF'
                  },
              }}
          />
        )
      }
}


function mapStatetoProps(state) {
    return {
        OrderByStatusDone: state.OrderByStatusDone,
        menuList: state.menuList
    }
}

export default connect(mapStatetoProps)(History);