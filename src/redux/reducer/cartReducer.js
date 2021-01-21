const INITIAL_STATE = {
  cart: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_CART_BY_USERID':
      return {
        ...state,
        cart: action.payload,
      };
    case 'LOGOUT':
      return INITIAL_STATE;
    default:
      return state;
  }
};
