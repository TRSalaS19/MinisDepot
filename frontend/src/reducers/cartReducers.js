import {ADD_ITEM_TO_CART} from '../const/cartConst';

export const cartReducer = (state = {cartItems: [] }, action) => {
  switch(action.type) {
    case ADD_ITEM_TO_CART: 

      const item = action.payload

      const itemExists = state.cartItems.find(itm => itm.product === item.product)

      if(itemExists) {
        // if items exists we are iterating throught cartItems and for every item if the product(id) is the same as itemsExists 
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

    default: 
      return state
  }
}
