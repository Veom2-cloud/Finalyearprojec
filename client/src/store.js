import {combineReducers} from 'redux'

import {createStore , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'
import { getAllItemsReducer , addItemReducer , getItemByIdReducer , editItemReducer} from './reducers/itemReducers'
import { cartReducer } from './reducers/cartReducer'
import { loginUserReducer, registerUserReducer  , getAllUsersReducer} from './reducers/userReducer'
import { placeOrderReducer , getUserOrdersReducer , getAllOrdersReducer } from './reducers/orderReducer'


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
    getAllUsersReducer : getAllUsersReducer
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
     cartReducer : {
        cartItems: cartItems
     },
     loginUserReducer :{
         user : user
     }
}

const composeEnhancers= composeWithDevTools({})

const store = createStore(finalReducer , initialState , composeEnhancers(applyMiddleware(thunk)))

export default store