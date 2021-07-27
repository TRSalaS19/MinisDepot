import {ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from '../const/cartConst';

export const cartReducer = (state = {cartItems: [] }, action) => {
  switch(action.type) {
    case ADD_ITEM_TO_CART: 

      const item = action.payload

      // checks to see if item exists in cartItems if it does it saves it to this value
      const itemExists = state.cartItems.find(itm => itm.product === item.product)

      // if item exists we are iterating through cartItems and comparing itemExists id to the each item in the cartsItems array and returning state if it does exsist else if item does not exist then we are adding the item to cartitems.  
      if(itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(i => i.product === itemExists.product ? item: i)
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }
    case REMOVE_ITEM_FROM_CART: 
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.product !== action.payload)
      }
    default: 
      return state
  }
}
