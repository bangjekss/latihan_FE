import { api_url } from '../../favordb/api_url';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { getTransactionHistoryByUserIDAction } from './';

export const addToCartAction = (getData, userID) => {
  return (dispatch) => {
    Axios.post(`${api_url}/cartdb`, getData)
      .then((response) => {
        console.log('POST_cartdb_addToCart - SUCCESS');
        Swal.fire({
          icon: 'success',
          title: 'Successfully',
          text: `${getData.name} have been added to your cart`,
          timer: 2000,
        });
        dispatch(getCartByUserIdAction(userID));
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oopps...',
          text: `Something went wrong. Please contact our Customer Service`,
          timer: 2000,
        });
      });
  };
};

export const getCartByUserIdAction = (userID) => {
  return (dispatch) => {
    Axios.get(`${api_url}/cartdb?userID=${userID}`)
      .then((response) => {
        console.log('GET_cartdb_getCartByUserID - SUCCESS');
        dispatch({
          type: 'GET_CART_BY_USERID',
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oopps...',
          text: `Something went wrong. Please contact our Customer Service`,
          timer: 2000,
        });
      });
  };
};

export const deleteCartItemAction = (cartID, userID, cartItemName) => {
  return (dispatch) => {
    Axios.delete(`${api_url}/cartdb/${cartID}`)
      .then((response) => {
        console.log('DELETE_cartdb_deleteCartItem - SUCCESS');
        Swal.fire({
          icon: 'success',
          title: 'Successfully',
          text: `${cartItemName} have been removed from your cart`,
          timer: 2000,
        });
        dispatch(getCartByUserIdAction(userID));
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oopps...',
          text: `Something went wrong. Please contact our Customer Service`,
          timer: 2000,
        });
      });
  };
};
export const checkoutAction = (checkoutData, userID) => {
  return (dispatch) => {
    Axios.post(`${api_url}/transactiondb`, checkoutData)
      .then((response) => {
        console.log('POST_transactiondb_checkout - SUCCESS');
        checkoutData.cart.forEach((value) => {
          Axios.delete(`${api_url}/cartdb/${value.id}`)
            .then((response) => {
              console.log('DELETE_cartdb_checkout - SUCCESS');
              Swal.fire({
                icon: 'success',
                title: 'Thankyou',
                text: `Transaction successfully approved`,
                timer: 2000,
              });
              dispatch(getTransactionHistoryByUserIDAction(userID));
              dispatch(getCartByUserIdAction(userID));
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Oopps...',
                text: `Something went wrong. Please contact our Customer Service`,
                timer: 2000,
              });
            });
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oopps...',
          text: `Something went wrong. Please contact our Customer Service`,
          timer: 2000,
        });
      });
  };
};
