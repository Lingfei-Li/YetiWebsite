export const ADD_TO_CART = 'ADD_TO_CART';
export const OPEN_PAGE = 'OPEN_PAGE';
export const NUKE_CART = 'NUKE_CART';
export const NUKE_REDUX_STORE = 'NUKE_REDUX_STORE';

export function addToCart(ticketToAdd) {
  return {
    type: ADD_TO_CART,
    ticketToAdd
  }
}

export function openPage(pageName) {
  return {
    type: OPEN_PAGE,
    pageName
  }
}

export function nukeCart() {
  return {
    type: NUKE_CART
  }
}

export function nukeReduxStore() {
  return {
    type: NUKE_REDUX_STORE
  }
}
