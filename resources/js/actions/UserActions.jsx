// Login actions
export function sendingLoginRequest() {
  return {
    type: 'SENDING-LOGIN-REQUEST',
  };
}

export function loginRequestSuccess() {
  return {
    type: 'LOGIN-REQUEST-SUCCESS',
  };
}

export function loginWrongCredentials() {
  return {
    type: 'LOGIN-WRONG-CREDENTIALS',
  };
}

export function loginRequestFailed() {
  return {
    type: 'LOGIN-REQUEST-FAILED',
  };
}

export function loginRequestErrors({ errors }) {
  return {
    type: 'LOGIN-REQUEST-ERRORS',
    payload: {
      errors,
    },
  };
}

export function cookiesExpired() {
  return {
    type: 'COOKIES-EXPIRED',
  };
}

export function loginStateRefresh() {
  return {
    type: 'LOGIN-STATE-REFRESH',
  };
}
