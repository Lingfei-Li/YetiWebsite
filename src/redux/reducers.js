import { ADD_TO_CART, PUBLISH_CART_MESSAGE, OPEN_PAGE, NUKE_CART, NUKE_REDUX_STORE } from './actions'

const initialState = {
  isSignedIn: false,
  cartItems: [],
  activePage: null,
  cartMessageContent: null,
  cartMessageType: "info",
};

const initialReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return Object.assign({}, state, {
        cartItems: [
          ...state.cartItems,
          action.ticketToAdd
        ]
      });
    case PUBLISH_CART_MESSAGE:
      return Object.assign({}, state, {
        cartMessageContent: action.msgContent,
        cartMessageType: action.msgType
      });
    case OPEN_PAGE:
      return Object.assign({}, state, {
        activePage: action.pageName
      });
    case NUKE_CART:
      return Object.assign({}, state, {
        cartItems: []
      });
    case NUKE_REDUX_STORE:
      return Object.assign({}, initialState);
    default:
      return state;
  }
};

export default initialReducer;
