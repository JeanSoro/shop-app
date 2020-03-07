import { createSelector } from 'reselect';


//input selector - returns slice of state needed - cart:cartReducer
const selectCart = state => state.cart;

//  cartItems is property on cart
export const selectCartItems = createSelector(
  [selectCart],
  //return value that we want from selector
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);


// ----------------------------------------------------------------------


//add item quantities
export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity, 0)
);


//checkout page total price
export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems => cartItems.reduce((accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity * cartItem.price, 0)

)

