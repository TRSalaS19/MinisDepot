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
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL
} from '../const/userConst';

export const login = (email, password) => async(dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST
    })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const { data } = await axios.post('/db/users/login', {email, password}, config)


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
  dispatch({ type: LOGOUT})
}


export const register = (name, email, password) => async(dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST
    })

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const { data } = await axios.post('/db/users', {name, email, password}, config)


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
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`/db/users/${id}`, config)


    dispatch({
      type: PROFILE_DETAILS_SUCCESS,
      payload: data
    })    
  } catch (error) {
    dispatch({
      type: PROFILE_DETAILS_FAIL,
      payload: 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
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

  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: 
        error.response && error.response.data.message 
        ? error.response.data.message
        : error.message
    })
  }
}