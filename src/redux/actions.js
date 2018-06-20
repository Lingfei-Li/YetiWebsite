export const ADD_TO_CART = 'ADD_TO_CART';
export const NUKE_CART = 'NUKE_CART';

export function addToCart(ticketToAdd) {
  return {
    type: ADD_TO_CART,
    ticketToAdd
  }
}

export function nukeCart() {
  return {
    type: NUKE_CART
  }
}
