import {
  PRODUCT_LIST_REQUEST, 
  PRODUCT_LIST_SUCCESS, 
  PRODUCT_LIST_FAIL,
  PRODUCT_INFO_REQUEST,
  PRODUCT_INFO_SUCCESS,
  PRODUCT_INFO_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
} from '../const/productConst';

export const productsListReducer = (state = { products: []}, action) => {
  switch(action.type){
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: []}
    case PRODUCT_LIST_SUCCESS:
      return {loading: false, products: action.payload}
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload}
    default: 
    return state
  }
}

export const productInfoReducer = (state = { product: {reviews: []} }, action) => {
  switch(action.type) {
    case PRODUCT_INFO_REQUEST: 
      return { loading: true, ...state}
    case PRODUCT_INFO_SUCCESS: 
      return {loading: false, product: action.payload}
    case PRODUCT_INFO_FAIL: 
      return {loading: false, error: action.payload}
    default: 
      return state
  }
}

export const adminDeleteProductReducer = (state = {}, action) => {
  switch(action.type) {
    case ADMIN_DELETE_PRODUCT_REQUEST:
      return {loading: true}
    case ADMIN_DELETE_PRODUCT_SUCCESS:
      return {loading: false, deleteSuccess: true}
    case ADMIN_DELETE_PRODUCT_FAIL:
      return {loading: false, deleteError: action.payload}
    default: 
      return state
  }
}