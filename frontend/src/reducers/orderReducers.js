import { 
  CREATE_ORDER_REQUEST, 
  CREATE_ORDER_SUCCESS, 
  CREATE_ORDER_FAIL,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAIL,
  ORDER_PAID_UPDATE_REQUEST,
  ORDER_PAID_UPDATE_SUCCESS,
  ORDER_PAID_UPDATE_FAIL,
  ORDER_PAID_UPDATE_RESET,
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL,
  GET_USER_ORDERS_RESET,
  ADMIN_ALL_ORDERS_LIST_SUCCESS,
  ADMIN_ALL_ORDERS_LIST_FAIL,
  ADMIN_ALL_ORDERS_LIST_REQUEST,
  ADMIN_ALL_ORDERS_LIST_RESET,
} from '../const/orderConst.js';

export const createOrderReducer = (state = {}, action)  => {
  switch(action.type) {
    case CREATE_ORDER_REQUEST: 
      return {loading: true}
    case CREATE_ORDER_SUCCESS: 
      return {loading: false, success: true, order: action.payload }
    case CREATE_ORDER_FAIL: 
      return {
        loading: false,
        error: action.payload
      }
    default: 
      return state
  }
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST:
      return {...state, loading: true}
    case GET_ORDER_DETAILS_SUCCESS: 
      return { loading: false, order: action.payload}
    case GET_ORDER_DETAILS_FAIL: 
      return { loading: false, error: action.payload}
    default:
      return state
  }
}

export const orderPaymentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAID_UPDATE_REQUEST:
      return { loading: true}
    case ORDER_PAID_UPDATE_SUCCESS: 
      return { loading: false, success: true}
    case ORDER_PAID_UPDATE_FAIL: 
      return { loading: false, error: action.payload}
    case ORDER_PAID_UPDATE_RESET: 
      return {}
    default:
      return state
  }
}

export const getUserOrdersReducer = (state = { orders: []}, action) => {
  switch (action.type) {
    case GET_USER_ORDERS_REQUEST:
      return { loading: true}
    case GET_USER_ORDERS_SUCCESS: 
      return { loading: false, orders: action.payload}
    case GET_USER_ORDERS_FAIL: 
      return { loading: false, error: action.payload}
    case GET_USER_ORDERS_RESET:
      return { orders: []}
    default:
      return state
  }
}

export const adminOrdersListReducer = (state = {orders: []}, action) => {
  switch (action.type) {
    case ADMIN_ALL_ORDERS_LIST_REQUEST:
      return {loading: true}
    case ADMIN_ALL_ORDERS_LIST_SUCCESS: 
      return {loading: false, orders: action.payload}
    case ADMIN_ALL_ORDERS_LIST_FAIL: 
      return {loading: false, error: action.payload}
    case ADMIN_ALL_ORDERS_LIST_RESET:
      return { orders: []}
    default:
      return state
  }
}