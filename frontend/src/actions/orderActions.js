import axios from 'axios';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL
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