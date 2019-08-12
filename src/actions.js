
import firebase from './Firebase'

export const loadOrder = () => {
    return (dispatch) => {
        const itemsRef = firebase.database().ref('order');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newitem = [];
            let index = -1;
            for (let item in items) {
                index++
                newitem.push({
                    key: item,
                    location1: items[item].location1,
                    location2: items[item].location2,
                    no: index,
                    orderList: items[item].orderKeyList,
                    orderBy: items[item].orderBy,
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


export const loadmenu = () => {
    return (dispatch) => {
        const itemsRef = firebase.database().ref('menu');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newitem = [];
            let index = -1;
            for (let item in items) {
                index++
                newitem.push({
                    key: item,
                    image: items[item].image,
                    name: items[item].name,
                    no: index,
                    price: items[item].price,
                })
            }
            dispatch({
                type: 'menuList',
                payload: newitem
            })
        })
    }
}