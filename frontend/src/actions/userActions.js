import axios from 'axios';
import {
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILE_DETAILS_RESET,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_USER_LIST_RESET,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_UPDATE_USER_DETAILS_REQUEST,
  ADMIN_UPDATE_USER_DETAILS_SUCCESS,
  ADMIN_UPDATE_USER_DETAILS_FAIL
} from '../const/userConst';
import {GET_USER_ORDERS_RESET} from '../const/orderConst';

export const login = (email, password) => async(dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/db/users/login', 
      {email, password}, 
      config
    )


    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}


export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentOption')
  
  dispatch({ type: LOGOUT})
  dispatch({ type: GET_USER_ORDERS_RESET})
  dispatch({ type: PROFILE_DETAILS_RESET})
  dispatch({ type: ADMIN_USER_LIST_RESET})

}


export const register = (name, email, password) => async(dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/db/users', 
      {name, email, password}, 
      config
    )


    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    })

    // once they register we log them in with: 

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
    
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}

export const getProfileDetails = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_DETAILS_REQUEST
    })

    const {login: {userInfo}} = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/db/users/${id}`, config)


    dispatch({
      type: PROFILE_DETAILS_SUCCESS,
      payload: data
    })    
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    if (message === 'You are not authorized to view this page') {
      dispatch(logout())
    }
    dispatch({
      type: PROFILE_DETAILS_FAIL,
      payload: message
    })
  }
}

export const profileUpdate = (user) => async(dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST
    })

    const {login: {userInfo}} = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`/db/users/profile`, user, config)
  
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data
    })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    })    

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    if (message === 'You are not authorized to view this page') {
      dispatch(logout())
    }
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: message
    })
  }
}

export const adminUserList = () => async(dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_USER_LIST_REQUEST
    })

    const {login: {userInfo}} = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/db/users/`, config)
  
    dispatch({
      type: ADMIN_USER_LIST_SUCCESS,
      payload: data
    })    

  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    if (message === 'You are not authorized to view this page') {
      dispatch(logout())
    }
    dispatch({
      type: ADMIN_USER_LIST_FAIL,
      payload: message
    })
  }
}

export const adminDeleteUser = (id) => async(dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_DELETE_USER_REQUEST
    })

    const {login: {userInfo}} = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`/db/users/${id}`, config)
  
    dispatch({
      type: ADMIN_DELETE_USER_SUCCESS
    })    

  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    if (message === 'You are not authorized to view this page') {
      dispatch(logout())
    }
    dispatch({
      type: ADMIN_DELETE_USER_FAIL,
      payload: message
    })
  }
}

export const adminUpdateUserDetails = (user) => async(
  dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_USER_DETAILS_REQUEST
    })

    const {login: {userInfo}} = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const {data} = await axios.put(`/db/users/${user._id}`, user, config)
  
    dispatch({
      type: ADMIN_UPDATE_USER_DETAILS_SUCCESS,
    })
    dispatch({
      type: PROFILE_DETAILS_SUCCESS,
      payload: data
    })
    dispatch({
      type: PROFILE_DETAILS_RESET
    }) 

  } catch (error) {
    const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    if (message === 'You are not authorized to view this page') {
      dispatch(logout())
    }
    dispatch({
      type:  ADMIN_UPDATE_USER_DETAILS_FAIL,
      payload: message
    })
  }
}