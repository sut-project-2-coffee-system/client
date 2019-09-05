
import firebase from './Firebase'

// export const loadOrder = () => {
//     return (dispatch) => {
//         const itemsRef = firebase.database().ref('order');
//         itemsRef.on('value', (snapshot) => {
//             let items = snapshot.val();
//             let newitem = [];
//             let index = -1;
//             for (let item in items) {
//                 index++
//                 newitem.push({
//                     key: item,
//                     location1: items[item].location1,
//                     location2: items[item].location2,
//                     no: index,
//                     orderList: items[item].orderKeyList,
//                     orderBy: items[item].orderBy,
//                     status: items[item].status,
//                     tel: items[item].tel,
//                     userImage: items[item].lineProfile.pictureUrl,
//                     displayName: items[item].lineProfile.displayName,
//                     userId: items[item].lineProfile.userId
//                 })
//             }
//             dispatch({
//                 type: 'loadOrder',
//                 payload: newitem
//             })
//         })
//     }
// }

export const loadOrderByStatus = (statusName, type) => {
    return (dispatch) => {
        const itemsRef = firebase.database().ref('order');
        itemsRef.orderByChild('status').equalTo(statusName).on('value', function (snapshot) {
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
                    status: items[item].status,
                    tel: items[item].tel,
                    userImage: items[item].lineProfile.pictureUrl,
                    displayName: items[item].lineProfile.displayName,
                    userId: items[item].lineProfile.userId,
                    time: (new Date(items[item].timestamp)).toString(),
                    pay: items[item].pay
                })
            }
            dispatch({
                type: type,
                payload: sortByEarliestDebutDate(newitem)
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

const sortByEarliestDebutDate = (nbaPlayers) => {
    return nbaPlayers.sort(function(a, b){
      return new Date(a.time) - new Date(b.time);
    });
  }
export const storeShoppingCart = (data = {}) => (
    {
        type: 'orderInOrderList', 
        data
    }
)
export const storeStatusOrderCalDrwer = (data = false) =>{
    if(data === true){
        return {
            type: 'openOrderCal', 
            data
        }
    }
    else{
        return {
            type: 'closeOrderCal', 
            data
        }
    }
}
