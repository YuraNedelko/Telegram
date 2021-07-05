const defaultState = {
  isLogedIn: false,
  sendingLoginRequest: false,
  loginRequestFailed: false,
  loginRequestErrors: {},
};

const UserReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Login actions
    case 'SENDING-LOGIN-REQUEST': {
      return {
        ...state,
        isLogedIn: false,
        sendingLoginRequest: true,
        loginRequestFailed: false,
        loginRequestErrors: {},
        loginWrongCredentials: false,
      };
    }
    case 'LOGIN-REQUEST-SUCCESS': {
      return {
        ...state,
        isLogedIn: true,
        sendingLoginRequest: false,
        loginRequestFailed: false,
        loginRequestErrors: {},
        loginWrongCredentials: false,
      };
    }
    case 'LOGIN-REQUEST-FAILED': {
      return {
        ...state,
        isLogedIn: false,
        sendingLoginRequest: false,
        loginRequestFailed: true,
        loginRequestErrors: {},
        loginWrongCredentials: false,
      };
    }

    case 'LOGIN-REQUEST-ERRORS': {
      return {
        ...state,
        isLogedIn: false,
        sendingLoginRequest: false,
        loginRequestFailed: false,
        loginRequestErrors: action.payload.errors,
        loginWrongCredentials: false,
      };
    }

    case 'LOGIN-WRONG-CREDENTIALS': {
      return {
        ...state,
        isLogedIn: false,
        sendingLoginRequest: false,
        loginRequestFailed: false,
        loginRequestErrors: {},
        loginWrongCredentials: true,
      };
    }

    // DEFAULT ACTION
    default: {
      return state;
    }
  }
};

export default UserReducer;
