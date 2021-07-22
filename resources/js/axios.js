import axios from 'axios';
import { cookiesExpired } from './actions/UserActions';

export function init(store) {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('isLoggedIn');
        store.dispatch(cookiesExpired());
      }

      return Promise.reject(error);
    },
  );
}

export default axios;
