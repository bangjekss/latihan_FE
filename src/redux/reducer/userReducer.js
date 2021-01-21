const INITIAL_STATE = {
  id: null,
  username: '',
  email: '',
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REG_LOGIN':
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
      };
    case 'LOGOUT':
      return INITIAL_STATE;
    default:
      return state;
  }
};
