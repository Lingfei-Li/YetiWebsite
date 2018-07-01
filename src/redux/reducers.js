import { ADD_TO_CART, PUBLISH_CART_INFO_BOX_MESSAGE, PUBLISH_TICKETS_INFO_BOX_MESSAGE, OPEN_PAGE, NUKE_CART, NUKE_REDUX_STORE } from './actions'

const initialState = {
  isSignedIn: false,
  cartItems: {},
  activePage: null,
  cartInfoBoxMessageContent: null,
  cartInfoBoxMessageType: "info",
  ticketsInfoBoxMessageContent: null,
  ticketsInfoBoxMessageType: "info",
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
