import { api_url } from '../../favordb/api_url';
import Axios from 'axios';

export const registerLoginAction = (getData) => {
  return {
    type: 'REG_LOGIN',
    payload: getData,
  };
};
export const keepLoginAction = (id_localStorage) => {
  return (dispatch) => {
    Axios.get(`${api_url}/userdb/${id_localStorage}`)
      .then((res) => {
        dispatch({
          type: 'REG_LOGIN',
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};
export const logoutAction = () => {
  return (dispatch) => {
    localStorage.removeItem('id');
    dispatch({
      type: 'LOGOUT',
    });
  };
};
