import { 
  createStore, 
  combineReducers, 
  applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import { 
  productsListReducer, 
  productInfoReducer 
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  loginReducer, 
  registerReducer, 
  profileDetailsReducer, 
  profileUpdateReducer
} from './reducers/userReducers';
import {
  createOrderReducer, 
  orderDetailsReducer, 
  orderPaymentUpdateReducer,
  getUserOrdersReducer
} from './reducers/orderReducers';


const reducer = combineReducers({
  productList: productsListReducer,
  productInfo: productInfoReducer,
  cart: cartReducer,
  login: loginReducer,
  register: registerReducer,
  profileDetails: profileDetailsReducer,
  updateProfile: profileUpdateReducer,
  orderCreate: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderPaid: orderPaymentUpdateReducer,
  userOrderList: getUserOrdersReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userDetailsFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentOptionFromStorage = localStorage.getItem('paymentOption') ? JSON.parse(localStorage.getItem('paymentOption')) : {}

const initialState = {
  cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentOption: paymentOptionFromStorage},
  login: {userInfo: userDetailsFromStorage},
};

const middleware = [thunk];

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;