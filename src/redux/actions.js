export const ADD_TO_CART = 'ADD_TO_CART';
export const PUBLISH_CART_INFO_BOX_MESSAGE = 'PUBLISH_CART_INFO_BOX_MESSAGE';
export const PUBLISH_TICKETS_INFO_BOX_MESSAGE = 'PUBLISH_TICKETS_INFO_BOX_MESSAGE';
export const PUBLISH_ORDERS_INFO_BOX_MESSAGE = 'PUBLISH_ORDERS_INFO_BOX_MESSAGE';
export const OPEN_PAGE = 'OPEN_PAGE';
export const UPDATE_USERNAME = "UPDATE_USERNAME";
export const OPEN_SIGN_IN_MODAL = "OPEN_SIGN_IN_MODAL";
export const OPEN_SIGN_UP_MODAL = "OPEN_SIGN_UP_MODAL";
export const HIDE_SIGN_IN_MODAL = "HIDE_SIGN_IN_MODAL";
export const HIDE_SIGN_UP_MODAL = "HIDE_SIGN_UP_MODAL";
export const CONFIRM_SIGN_IN = "CONFIRM_SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const NUKE_CART = 'NUKE_CART';
export const NUKE_REDUX_STORE = 'NUKE_REDUX_STORE';

export function addToCart(ticketToAdd) {
  return {
    type: ADD_TO_CART,
    ticketToAdd
  }
}

export function publishCartInfoBoxMessage(msgContent, msgType) {
  return {
    type: PUBLISH_CART_INFO_BOX_MESSAGE,
    msgContent,
    msgType
  }
}

export function publishTicketsInfoBoxMessage(msgContent, msgType) {
  return {
    type: PUBLISH_TICKETS_INFO_BOX_MESSAGE,
    msgContent,
    msgType
  }
}

export function publishOrdersInfoBoxMessage(msgContent, msgType) {
  return {
    type: PUBLISH_ORDERS_INFO_BOX_MESSAGE,
    msgContent,
    msgType
  }
}

export function openPage(pageName) {
  return {
    type: OPEN_PAGE,
    pageName
  }
}

export function updateUsername(username) {
  return {
    type: UPDATE_USERNAME,
    username: username
  }
}

export function openSignInModal() {
  return {
    type: OPEN_SIGN_IN_MODAL
  }
}

export function openSignUpModal() {
  return {
    type: OPEN_SIGN_UP_MODAL
  }
}

export function hideSignInModal() {
  return {
    type: HIDE_SIGN_IN_MODAL
  }
}

export function hideSignUpModal() {
  return {
    type: HIDE_SIGN_UP_MODAL
  }
}

export function confirmSignIn(apiJwtToken) {
  return {
    type: CONFIRM_SIGN_IN,
    apiJwtToken
  }
}

export function signOut() {
  return {
    type: SIGN_OUT
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
