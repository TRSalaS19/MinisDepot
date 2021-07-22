import axios from 'axios';
import {ADD_ITEM_TO_CART} from '../const/cartConst';

export const AddToCart = (id, qty) => async(dispatch, getState) => {
  const {data} = await axios.get(`/db/products/${id}`)

  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price, 
      unitsAvailable: data.unitsAvailable,
      qty
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}