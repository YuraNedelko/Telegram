import React, { useEffect } from 'react';
import {
  useDispatch, useSelector, shallowEqual,
} from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  loginRequestErrors, loginRequestFailed, loginRequestSuccess,
  loginWrongCredentials, sendingLoginRequest,
} from '../actions/UserActions';
import styles from '../../sass/login.module.scss';

function LoginComponent() {
  const isSending = useSelector((state) => state.user.sendingLoginRequest);
  const errors = useSelector((state) => state.user.loginRequestErrors);
  const requestFailed = useSelector((state) => state.user.loginRequestFailed);
  const wrongCredentials = useSelector((state) => state.user.loginWrongCredentials);
  const isLogedIn = useSelector((state) => state.user.isLogedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(
    () => { if (isLogedIn) history.push('/main'); },
  );

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    dispatch(sendingLoginRequest());
    try {
      await axios.get('/sanctum/csrf-cookie');
    } catch (e) {
      dispatch(loginRequestFailed());
    }

    axios.post('/login', data)
      .then((response) => {
        if (response.data?.success === true) {
          dispatch(loginRequestSuccess());
          history.push('/main');
        }
      })
      .catch((error) => {
        if (error.response?.status) {
          if (error.response.status === 422) {
            dispatch(loginRequestErrors(error.response.data));
          } else if (error.response?.status === 401) {
            dispatch(loginWrongCredentials());
          } else {
            dispatch(loginRequestFailed());
          }
        } else {
          dispatch(loginRequestFailed());
        }
      });
  }

  return (
    <div className={styles['login-container']}>
      <form onSubmit={handleSubmit}>
        {isSending && <div className={styles['sending-indicator']} /> }

        <span>Login</span>

        <label htmlFor="email"> Email: </label>
        <input id="email" type="text" name="email" />
        <div className={styles['validation-error']}>
          {errors && errors.email ? errors.email : ''}
        </div>

        <label htmlFor="password"> Password:  </label>
        <input id="password" name="password" />
        <div className={styles['validation-error']} />

        {requestFailed && <div className={styles['login-request-fail']}>Request failed</div>}
        {wrongCredentials && <div className={styles['login-request-fail']}>Wrong credentials</div>}
        <div className={styles['submit-button-container']}>
          <input type="submit" className={styles['submit-button']} value="Login" />
        </div>

      </form>
    </div>

  );
}

export default LoginComponent;
