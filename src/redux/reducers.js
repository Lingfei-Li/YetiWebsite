import { ADD_TO_CART, OPEN_PAGE, NUKE_CART, NUKE_REDUX_STORE } from './actions'

const initialState = {
  cartItems: [],
  activePage: null
};

const initialReducer = (state = initialState, action) => {
  console.log(`state: ${JSON.stringify(state, null, 2)}`);
  switch (action.type) {
    case ADD_TO_CART:
      return Object.assign({}, state, {
        cartItems: [
          ...state.cartItems,
          action.ticketToAdd
        ]
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
