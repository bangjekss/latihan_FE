import { api_url } from '../../favordb/api_url';
import Axios from 'axios';
import Swal from 'sweetalert2';

export const getProductdb = () => {
  return (dispatch) => {
    dispatch({
      type: 'GET_PRODUCTDB_LOADING_START',
    });
    Axios.get(`${api_url}/productdb`)
      .then((response) => {
        console.log('GET_productdb - SUCCESS');
        dispatch({
          type: 'GET_PRODUCTDB_LOADING_FINISH',
        });
        dispatch({
          type: 'GET_PRODUCTDB',
          payload: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteProductAction = (productID) => {
  return (dispatch) => {
    Axios.delete(`${api_url}/productdb/${productID}`)
      .then((response) => {
        console.log('DELETE_productdb_deleteProduct - SUCCESS');
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        dispatch(getProductdb());
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

export const patchProductAction = (productID, patchData) => {
  return (dispatch) => {
    Axios.patch(`${api_url}/productdb/${productID}`, patchData)
      .then((response) => {
        console.log('PATCH_productdb_patchProduct - SUCCESS');
        Swal.fire('Saved!', 'Your file has been edited.', 'success');
        dispatch(getProductdb());
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

export const postProductAction = (newProduct) => {
  return (dispatch) => {
    Axios.post(`${api_url}/productdb`, newProduct)
      .then((response) => {
        console.log('POST_productdb_postProduct - SUCCESS');
        Swal.fire('Product added!', 'Successfully, add new product', 'success');
        dispatch(getProductdb());
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
