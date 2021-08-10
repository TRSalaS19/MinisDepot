import { 
  LOGIN_FAIL, 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  PROFILE_DETAILS_RESET,
  PROFILE_DETAILS_FAIL,
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_RESET,
  ADMIN_USER_LIST_REQUEST,
  ADMIN_USER_LIST_SUCCESS,
  ADMIN_USER_LIST_FAIL,
  ADMIN_USER_LIST_RESET,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  ADMIN_UPDATE_USER_DETAILS_FAIL,
  ADMIN_UPDATE_USER_DETAILS_SUCCESS,
  ADMIN_UPDATE_USER_DETAILS_REQUEST,
  ADMIN_UPDATE_USER_DETAILS_RESET,
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
    case LOGOUT : 
      return {}
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
    case PROFILE_DETAILS_RESET:
      return { user: {} }
    default: 
      return state
  }
}

export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return {loading:true}
    case PROFILE_UPDATE_SUCCESS:
      return {loading:false,success: true, userInfo: action.payload }
    case PROFILE_UPDATE_FAIL:
      return {loading:false, error: action.payload}
    case PROFILE_UPDATE_RESET:
      return {}
    default: 
      return state
  }
}

export const adminUserListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_USER_LIST_REQUEST:
      return {loading:true}
    case ADMIN_USER_LIST_SUCCESS:
      return {loading:false, users: action.payload }
    case ADMIN_USER_LIST_FAIL:
      return {loading:false, error: action.payload}
    case ADMIN_USER_LIST_RESET:
      return { users: []}
    default: 
      return state
  }
}

export const adminDeleteUserReducer = (state = { }, action) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUEST:
      return {loading:true}
    case ADMIN_DELETE_USER_SUCCESS:
      return {loading:false, deleteSuccess: true }
    case ADMIN_DELETE_USER_FAIL:
      return {loading:false, error: action.payload}
    default: 
      return state
  }
}

export const adminUpdateUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_DETAILS_REQUEST:
      return {loading:true}
    case ADMIN_UPDATE_USER_DETAILS_SUCCESS:
      return {loading:false, success: true, user: action.payload }
    case ADMIN_UPDATE_USER_DETAILS_FAIL:
      return {loading:false, error: action.payload}
    case ADMIN_UPDATE_USER_DETAILS_RESET:
      return { user: {}}
    default: 
      return state
  }
}