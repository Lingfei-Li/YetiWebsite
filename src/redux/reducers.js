import {
  ADD_TO_CART, PUBLISH_CART_INFO_BOX_MESSAGE, PUBLISH_TICKETS_INFO_BOX_MESSAGE, OPEN_PAGE, OPEN_SIGN_IN_MODAL, OPEN_SIGN_UP_MODAL, HIDE_SIGN_IN_MODAL, HIDE_SIGN_UP_MODAL,
  UPDATE_USERNAME, NUKE_CART, NUKE_REDUX_STORE, CONFIRM_SIGN_IN, SIGN_OUT
} from './actions'

const initialState = {
  isSignedIn: false,
  username: "",
  cartItems: {},
  activePage: null,
  cartInfoBoxMessageContent: null,
  cartInfoBoxMessageType: "info",
  ticketsInfoBoxMessageContent: null,
  ticketsInfoBoxMessageType: "info",
  showSignInModal: false,
  showSignUpModal: false,
};

const initialReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.ticketToAdd;
      const newItemId = newItem.itemId;
      const currentCartItems = Object.assign({}, state.cartItems);

      let updatedItem;
      if (currentCartItems.hasOwnProperty(newItemId)) {
        // The Id already exists. Aggregate the quantity and keep the other information untouched
        const oldItem = currentCartItems[newItemId];
        updatedItem = Object.assign(oldItem, {
          quantity: parseInt(oldItem.quantity, 10) + parseInt(newItem.quantity, 10)
        });
      } else {
        // New item. Directly assign the item to this Id
        updatedItem = Object.assign({}, newItem);
      }

      currentCartItems[newItemId] = updatedItem;

      return Object.assign({}, state, {
        cartItems: currentCartItems
      });
    case PUBLISH_CART_INFO_BOX_MESSAGE:
      return Object.assign({}, state, {
        cartInfoBoxMessageContent: action.msgContent,
        cartInfoBoxMessageType: action.msgType
      });
    case PUBLISH_TICKETS_INFO_BOX_MESSAGE:
      return Object.assign({}, state, {
        ticketsInfoBoxMessageContent: action.msgContent,
        ticketsInfoBoxMessageType: action.msgType
      });
    case OPEN_PAGE:
      return Object.assign({}, state, {
        activePage: action.pageName
      });
    case SIGN_OUT:
      return Object.assign({}, state, {
        isSignedIn: false,
        username: ""
      });
    case CONFIRM_SIGN_IN:
      return Object.assign({}, state, {
        isSignedIn: true
      });
    case UPDATE_USERNAME:
      return Object.assign({}, state, {
        username: action.username
      });
    case OPEN_SIGN_IN_MODAL:
      return Object.assign({}, state, {
        showSignInModal: true
      });
    case OPEN_SIGN_UP_MODAL:
      return Object.assign({}, state, {
        showSignUpModal: true
      });
    case HIDE_SIGN_IN_MODAL:
      return Object.assign({}, state, {
        showSignInModal: false
      });
    case HIDE_SIGN_UP_MODAL:
      return Object.assign({}, state, {
        showSignUpModal: false
      });
    case NUKE_CART:
      return Object.assign({}, state, {
        cartItems: {}
      });
    case NUKE_REDUX_STORE:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};

export default initialReducer;
