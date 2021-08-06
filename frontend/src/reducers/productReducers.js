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
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_RESET,
  ADMIN_CREATE_NEW_PRODUCT_REQUEST,
  ADMIN_CREATE_NEW_PRODUCT_SUCCESS,
  ADMIN_CREATE_NEW_PRODUCT_FAIL,
  ADMIN_CREATE_NEW_PRODUCT_RESET,
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

export const adminCreateNewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_NEW_PRODUCT_REQUEST:
      return {loading: true }
    case ADMIN_CREATE_NEW_PRODUCT_SUCCESS:
      return {loading: false, successCreate: true, product: action.payload}
    case ADMIN_CREATE_NEW_PRODUCT_FAIL:
      return {loading: false, errorCreate: action.payload}
    case ADMIN_CREATE_NEW_PRODUCT_RESET:
      return {}
    default: 
      return state
  }
}

export const adminUpdateProductReducer = (state = {product: {}}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_PRODUCT_REQUEST:
      return {loading: true}
    case ADMIN_UPDATE_PRODUCT_SUCCESS:
      return {loading: false, updateSuccess: true, product: action.payload}
    case ADMIN_UPDATE_PRODUCT_FAIL:
      return {loading: false, updateError: action.payload}
    case ADMIN_UPDATE_PRODUCT_RESET:
      return {product: {}}
    default:
      return state
  }
}