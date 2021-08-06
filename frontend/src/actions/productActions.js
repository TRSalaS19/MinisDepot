import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_INFO_REQUEST,
  PRODUCT_INFO_SUCCESS,
  PRODUCT_INFO_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_CREATE_NEW_PRODUCT_REQUEST,
  ADMIN_CREATE_NEW_PRODUCT_SUCCESS,
  ADMIN_CREATE_NEW_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL
} from '../const/productConst';


export const listAllProducts = () => async(dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/db/products')

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const productInfo = (id) => async(dispatch) => {
  try {
    dispatch({type: PRODUCT_INFO_REQUEST})

    const { data } = await axios.get(`/db/products/${id}`)

    dispatch({
      type: PRODUCT_INFO_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_INFO_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const adminProductDelete = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_DELETE_PRODUCT_REQUEST
    })

    const {login: {userInfo}} = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/db/products/${id}`, config)

    dispatch({
      type: ADMIN_DELETE_PRODUCT_SUCCESS
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_INFO_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const adminProductCreate = () => async(dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_CREATE_NEW_PRODUCT_REQUEST
    })

    const {login: {userInfo}} = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.post(`/db/products`, {}, config)

    dispatch({
      type: ADMIN_CREATE_NEW_PRODUCT_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_NEW_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}

export const adminProductUpdate = (product) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_PRODUCT_REQUEST
    });

    const {login : {userInfo}} = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const {data} = await axios.put(`/db/products/${product._id}`, product, config);

    dispatch({
      type: ADMIN_UPDATE_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_PRODUCT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}