import { 
  LOGIN_FAIL, 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_RESET,
} from "../const/userConst"
  
export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {loading:true}
    case LOGIN_SUCCESS:
      return {loading:false, userInfo: action.payload}
    case LOGIN_FAIL:
      return {loading:false, error: action.payload}
    case LOGOUT: 
      return {}
    default: 
      return state
  }
}

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {loading:true}
    case REGISTER_SUCCESS:
      return {loading:false, userInfo: action.payload}
    case REGISTER_FAIL:
      return {loading:false, error: action.payload}
    default: 
      return state
  }
}

export const profileDetailsReducer = (state = { user: {}}, action) => {
  switch (action.type) {
    case PROFILE_DETAILS_REQUEST:
      return {...state, loading:true}
    case PROFILE_DETAILS_SUCCESS:
      return {loading:false, user: action.payload}
    case PROFILE_DETAILS_FAIL:
      return {loading:false, error: action.payload}
    case PROFILE_UPDATE_RESET:
      return { user: {} }
    default: 
      return state
  }
}

export const profileUpdateReducer = (state = { }, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return {loading:true}
    case PROFILE_UPDATE_SUCCESS:
      return {loading:false,success: true, userInfo: action.payload }
    case PROFILE_UPDATE_FAIL:
      return {loading:false, error: action.payload}
    default: 
      return state
  }
}