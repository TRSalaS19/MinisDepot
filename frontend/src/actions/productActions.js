import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_INFO_REQUEST,
  PRODUCT_INFO_SUCCESS,
  PRODUCT_INFO_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS
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

export const productInfoList = (id) => async(dispatch) => {
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