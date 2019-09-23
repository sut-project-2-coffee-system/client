import firebase from './Firebase'

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
                    lineProfile: items[item].lineProfile,
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


export const loadMember = () => {
    return (dispatch) => {
        firebase.database().ref('member').on('value', function (snapshot) {
            let items = snapshot.val();
            let newitem = [];

            for (let item in items) {
                newitem.push({
                    ...items[item],
                    key: item
                })
            }

            dispatch({
                type: 'memberList',
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

export const loadPromotion = () => {
    return (dispatch) => {
        const itemsRef = firebase.database().ref('promotion');
        itemsRef.on('value', function (snapshot) {
            let promotions = snapshot.val();
            let myData = {
                itemBaht: [],
                itemPercent: []
            };
            let itemBahtTemp = [];
            let itemPercentTemp = [];
            let index = 0
            for (let promotion in promotions) {
                for(let item in promotions[promotion]){
                    if(index === 0){
                        if(promotions[promotion][item].startDate <= promotions[promotion][item].endDate){
                            itemBahtTemp.push({
                                key: item,
                                buyTarget:promotions[promotion][item].fullBuy,
                                discount: promotions[promotion][item].value,
                                endDate: promotions[promotion][item].endDate,
                                startDate: promotions[promotion][item].startDate,
                            })                           
                        }
                    }
                    else {
                        if(promotions[promotion][item].startDate <= promotions[promotion][item].endDate){
                            itemPercentTemp.push({
                                key: item,
                                buyTarget:promotions[promotion][item].fullBuy,
                                discount: promotions[promotion][item].value,
                                endDate: promotions[promotion][item].endDate,
                                startDate: promotions[promotion][item].startDate,
                            })
                        }
                    }
                }
                index++
            }
            myData.itemBaht = itemBahtTemp
            myData.itemPercent = itemPercentTemp
            dispatch({
                type: 'promotionList',
                payload: myData
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