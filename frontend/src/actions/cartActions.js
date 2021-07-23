import axios from 'axios';
import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from '../const/cartConst';

export const AddToCart = (id, itemQty) => async(dispatch, getState) => {

  const {data} = await axios.get(`/db/products/${id}`)

  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price, 
      unitsAvailable: data.unitsAvailable,
      itemQty
    }
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

