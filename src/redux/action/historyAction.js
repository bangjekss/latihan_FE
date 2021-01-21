import { api_url } from '../../favordb/api_url';
import Axios from 'axios';
import Swal from 'sweetalert2';

export const getTransactionHistoryByUserIDAction = (userID) => {
  return (dispatch) => {
    Axios.get(`${api_url}/transactiondb?userID=${userID}`)
      .then((response) => {
        console.log('GET_transactiondb_getTransactionHistoryByUserID - SUCCESS');
        dispatch({
          type: 'GET_HISTORY_BY_USERID',
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
