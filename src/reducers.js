import { combineReducers} from 'redux'

function changetabValue(state = 1,action){
    switch (action.type){
        case 'tab0':
            return 0
        case 'tab1':
            return 1
        default:
            return state
    }
}


function orderSelectWait(state = 0, action) {
    switch (action.type) {
        case 'orderSelectWait':
            return action.payload
        default:
                return state
    }
}

function orderSelectDoing(state = 0, action) {
    switch (action.type) {
        case 'orderSelectDoing':
            return action.payload
        default:
                return state
    }
}

function loadOrderByStatusDoing(state = [], action){
    switch (action.type){
        case 'loadOrderByStatusDoing':
            return action.payload
        default:
            return state
    }
}

function loadOrderByStatusWait(state = [], action){
    switch (action.type){
        case 'loadOrderByStatusWait':
            return action.payload
        default:
            return state
    }
}

function loadOrderByStatusDone(state = [], action){
    switch (action.type){
        case 'loadOrderByStatusDone':
            return action.payload
        default:
            return state
    }
}


function menuList(state = [] ,action){
    switch(action.type){
        case 'menuList':
            return action.payload
        default:
            return state
    }
}



function sideBarName(state = "Coffee Management System",action){
    switch(action.type){
        case 'sideBarName':
            return action.payload
        default:
            return state
    }
}

function totalPrice(state = 0 ,action){
    switch(action.type){
        case 'totalPrice':
            return action.payload
        default:
            return state
    }
}

const reducers = combineReducers({
    tabValue: changetabValue,
    OrderByStatusDone: loadOrderByStatusDone,
    OrderByStatusDoing: loadOrderByStatusDoing,
    OrderByStatusWait: loadOrderByStatusWait,
    orderSelectWait: orderSelectWait,
    orderSelectDoing: orderSelectDoing,
    menuList: menuList,
    sideBarName: sideBarName,
    totalPrice: totalPrice
    // menuInOrder: menuInOrder
})

export default reducers