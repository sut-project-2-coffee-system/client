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

const reducers = combineReducers({
    tabValue: changetabValue,
})

export default reducers