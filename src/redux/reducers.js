import { ADD_TO_CART, NUKE_CART } from './actions'

const initialState = {
  cartItems: []
};

const initialReducer = (state = initialState, action) => {
  console.log(`state: ${JSON.stringify(state, null, 2)}`);
  switch (action.type) {
    case ADD_TO_CART:
      const ticketToAdd = action.ticketToAdd;
      return Object.assign({}, state, {
        cartItems: [
          ...state.cartItems,
          ticketToAdd
        ]
      });
    case NUKE_CART:
      return Object.assign({}, state, {
        cartItems: [
        ]
      });
    default:
      return state;
  }
};

export default {
  initialReducer
}