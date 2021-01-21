const INITIAL_STATE = {
  productdb: [],
  isLoading: false,
};

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_PRODUCTDB_LOADING_START':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_PRODUCTDB_LOADING_FINISH':
      return {
        ...state,
        isLoading: false,
      };
    case 'GET_PRODUCTDB':
      return {
        ...state,
        productdb: action.payload,
      };
    default:
      return state;
  }
};
