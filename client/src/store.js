import {combineReducers} from 'redux'

import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'
import { getAllItemsReducer , addItemReducer , getItemByIdReducer , editItemReducer} from './reducers/itemReducers'
import { cartReducer } from './reducers/cartReducer'
import { getAllCanteenitemsReducer,addCanteenItemReducer,editCanteenItemReducer,getCanteenItemByIdReducer } from './reducers/canteenitemreducer'
import { loginUserReducer, registerUserReducer  , getAllUsersReducer} from './reducers/userReducer'
import { placeOrderReducer , getUserOrdersReducer , getAllOrdersReducer } from './reducers/orderReducer'
import { getuserByIdReducer,edituserReducer } from './reducers/userReducer'
import { cartCanteenReducer } from './reducers/Canteencartreducer'
import { placeCanteenOrderReducer, getUserCanteenOrdersReducer ,getAllCanteenOrdersReducer } from './reducers/CanteenorderReducer'

const finalReducer = combineReducers({
    getAllItemsReducer : getAllItemsReducer,
    cartReducer : cartReducer,
    registerUserReducer : registerUserReducer,
    loginUserReducer:loginUserReducer,
    placeOrderReducer : placeOrderReducer,
    getUserOrdersReducer : getUserOrdersReducer,
    addItemReducer : addItemReducer,
    getItemByIdReducer : getItemByIdReducer,
    editItemReducer : editItemReducer,
    getAllOrdersReducer : getAllOrdersReducer,
    getAllUsersReducer : getAllUsersReducer,
    getAllCanteenitemsReducer: getAllCanteenitemsReducer,
    addCanteenItemReducer: addCanteenItemReducer,
    editCanteenItemReducer: editCanteenItemReducer,
    getCanteenItemByIdReducer: getCanteenItemByIdReducer,
    getuserByIdReducer: getuserByIdReducer,
    edituserReducer: edituserReducer,
    cartCanteenReducer: cartCanteenReducer,
    placeCanteenOrderReducer: placeCanteenOrderReducer,
    getAllCanteenOrdersReducer: getAllCanteenOrdersReducer,
    getUserCanteenOrdersReducer: getUserCanteenOrdersReducer
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const cartcanteenItems = localStorage.getItem('cartcanteenItems') ? JSON.parse(localStorage.getItem('cartcanteenItems')) : []


const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
     cartReducer : {
        cartItems: cartItems
     },
     cartCanteenReducer: {
        cartcanteenItems: cartcanteenItems
     },
     loginUserReducer :{
         user : user
     }
}

const composeEnhancers= composeWithDevTools({})

const store = createStore(finalReducer , initialState , composeEnhancers(applyMiddleware(thunk)))

export default store