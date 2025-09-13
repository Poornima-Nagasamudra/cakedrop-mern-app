import { applyMiddleware, combineReducers, createStore } from "redux";
import {thunk} from 'redux-thunk'
import userReducer from "../Reducers/UserReducer";
import productReducer from "../Reducers/ProductReducer";
import cartReducer from "../Reducers/CartReducer";
import orderReducer from "../Reducers/OrderReducer";

function configureStore(){
    const store = createStore(combineReducers({
            user : userReducer,
            product : productReducer,
            cart: cartReducer,
            order: orderReducer
    }), applyMiddleware(thunk)) 
    return store
}

export default configureStore