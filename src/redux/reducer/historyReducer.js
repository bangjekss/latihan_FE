const INITIAL_STATE = {
  transactiondb: [],
};

export const historyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_HISTORY_BY_USERID':
      return {
        ...state,
        transactiondb: action.payload,
      };
    default:
      return state;
  }
};
