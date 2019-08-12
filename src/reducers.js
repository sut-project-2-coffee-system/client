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


function orderSelect(state = 0, action) {
    switch (action.type) {
        case 'orderSelect':
            return action.payload
        default:
                return state
    }
}

function orders(state = [], action){
    switch (action.type){
        case 'loadOrder':
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

// function menuInOrder(state = [], action){
//     switch (action.type){
//         case 'menuInOrder':
//             return action.payload
//         default:
//             return state
//     }
// }

const reducers = combineReducers({
    tabValue: changetabValue,
    orders: orders,
    orderSelect: orderSelect,
    menuList: menuList,
    sideBarName: sideBarName
    // menuInOrder: menuInOrder
})

export default reducers