import { combineReducers } from 'redux'

function changetabValue(state = 1, action) {
    switch (action.type) {
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

function loadOrderByStatusDoing(state = [], action) {
    switch (action.type) {
        case 'loadOrderByStatusDoing':
            return action.payload
        default:
            return state
    }
}

function loadOrderByStatusWait(state = [], action) {
    switch (action.type) {
        case 'loadOrderByStatusWait':
            return action.payload
        default:
            return state
    }
}

function loadOrderByStatusDone(state = [], action) {
    switch (action.type) {
        case 'loadOrderByStatusDone':
            return action.payload
        default:
            return state
    }
}


function menuList(state = [], action) {
    switch (action.type) {
        case 'menuList':
            return action.payload
        case 'RESET_MENU_LIST_AMOUNT':
            return state
        default:
            return state
    }
}

function promotionList(state = [], action) {
    switch (action.type) {
        case 'promotionList':
            return action.payload
        default:
            return state
    }
}

const initstate = {
    arr: []
}
function testList(state = initstate, action) {
    switch (action.type) {
        case 'testList':
            return {
                ...state,
                arr: action.payload
            }

        case 'SetNull':
            return {
                ...state,
                arr: []
            }
        case 'Edit':
            return {
                ...state,
                arr: state.arr.map(
                    (arr, i) => i === 0 ? {
                        ...arr, amount: arr.amount + 1
                        , name: arr.name + '1'
                    }
                        : arr
                )
            }

        default:
            return state
    }
}




function sideBarName(state = "Coffee Management System", action) {
    switch (action.type) {
        case 'sideBarName':
            return action.payload
        default:
            return state
    }
}
let arr = []
function shoppingCart(state = [], action) {
    switch (action.type) {
        case 'orderInOrderList':
            arr.push(action.data)
            return { ...state, arr }
        case 'addAmount':
            if (action.data.amount < 1)
                state.arr.splice(action.i, 1)
            else
                state.arr[action.i] = action.data
            return { ...state, ...state }
        case 'clearOrder':
            arr = []
            return { ...state, arr }
        default:
            return state
    }
}


function totalPrice(state = 0, action) {
    switch (action.type) {
        case 'totalPrice':
            return action.payload
        default:
            return state
    }
}

function handleDrawerOrderCal(state = false, action) {
    switch (action.type) {
        case "openOrderCal":
            return state || action.data
        case "closeOrderCal":
            return state && action.data
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
    totalPrice: totalPrice,
    testList: testList,
    shoppingCart: shoppingCart,
    handleDrawerOrderCal:handleDrawerOrderCal,
    promotionList: promotionList
    // menuInOrder: menuInOrder
})

export default reducers