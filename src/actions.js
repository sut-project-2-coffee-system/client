
import firebase from './Firebase'

export const loadOrder = () => {
    return (dispatch) => {
        const itemsRef = firebase.database().ref('order');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newitem = [];
            let index = -1;
            for(let item in items){
                index++
                newitem.push({
                    key: item,
                    location1: items[item].location1,
                    location2: items[item].location2,
                    no:index,
                    orderList:items[item].orderList,
                    orderBy:items[item].orderBy,
                    status: items[item].status
                 })
            }
            dispatch({
                type: 'loadOrder',
                payload: newitem
            })
        })
    }
}


export const loadMenuSelect = (orderselect) =>{
    return (dispatch) => {
        let menuTemp = []
        orderselect.orderList.map(item => {
            firebase.database().ref(`menu/${item.key}`).on('value', function (snapshot) {
                menuTemp.push(createRow(snapshot.val().name, item.amount, snapshot.val().price))
            });
            return ''
        })
        dispatch({
            type: 'menuInOrder',
            payload: menuTemp
        })
    }
}


function priceRow(qty, unit) {
    return qty * unit;
}

function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
}
