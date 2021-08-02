import axios from 'axios';
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
  GET_USER_ORDERS_REQUEST,
  GET_USER_ORDERS_SUCCESS,
  GET_USER_ORDERS_FAIL,
} from '../const/orderConst';

export const createOrder = (order) => async(dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST
    })

    const {login: {userInfo}} = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }
    }

    const { data } = await axios.post(`/db/orders`, order, config)

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response && error.response.data.message 
      ? error.response.data.message
      : error.message
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ORDER_DETAILS_REQUEST
    })
    
    const { login: {userInfo}} = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/db/orders/${id}`, config)

    dispatch({
      type: GET_ORDER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_ORDER_DETAILS_FAIL,
      payload: error.response && error.response.data.message
      ? error.message.data.message 
      : error.message
    })
  }
}

export const orderPayment = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAID_UPDATE_REQUEST
    })
    
    const { login: {userInfo}} = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/db/orders/${orderId}/pay`, paymentResult, config)

    dispatch({
      type: ORDER_PAID_UPDATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAID_UPDATE_FAIL,
      payload: error.response && error.response.data.message
      ? error.message.data.message 
      : error.message
    })
  }
}

export const getUserOrdersList = (orderId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_ORDERS_REQUEST
    })
    
    const { login: {userInfo}} = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/db/orders/userorders`, config)

    dispatch({
      type: GET_USER_ORDERS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: GET_USER_ORDERS_FAIL,
      payload: error.response && error.response.data.message
      ? error.message.data.message 
      : error.message
    })
  }
}