import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
	productsReducer,
	productDetailsReducer,
	productDeleteRducer,
	productCreateRducer,
	productUpdateRducer
} from './reducers/productsReducers';
import { cartReducer } from './reducers/cartReducers';
import {
	userLoginRducer,
	userRegisterRducer,
	userDetailsReducer,
	userUpdateProfileReducer,
	userListReducer,
	userDeleteReducer,
	userUpdateReducer
} from './reducers/userReducers';
import {
	orderCreateReducer,
	orderDetailsReducer,
	orderPayReducer,
	orderListUserReducer,
	orderListAdminReducer,
	orderDeliverReducer
} from './reducers/orderReducers';

const reducer = combineReducers({
	productsList: productsReducer,
	productDetails: productDetailsReducer,
	productDelete: productDeleteRducer,
	productCreate: productCreateRducer,
	productUpdate: productUpdateRducer,
	cart: cartReducer,
	userLogin: userLoginRducer,
	userRegister: userRegisterRducer,
	userDetails: userDetailsReducer,
	userUpdateProfile: userUpdateProfileReducer,
	userList: userListReducer,
	userDelete: userDeleteReducer,
	userUpdate: userUpdateReducer,
	orderCreate: orderCreateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	ordersListUser: orderListUserReducer,
	ordersListAdmin: orderListAdminReducer,
	orderDeliver: orderDeliverReducer
});

const cartItemsFromStorge = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];
const userInfoFromStorge = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;
const shippingAddressFromStorge = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {};

const initialState = {
	cart: {
		cartItems: cartItemsFromStorge,
		shippingAddress: shippingAddressFromStorge
	},
	userLogin: { userInfo: userInfoFromStorge }
};

const middleware = [ thunk ];
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
