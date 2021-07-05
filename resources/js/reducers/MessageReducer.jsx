const defaultState = {
  messages: [],
  fetchRequestFailed: false,
  fetchRequestSending: false,
  sendingMessage: false,
  sendingMessageFailed: false,
  needsScroll: {},
};

const MessagesReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Fetch actions
    case 'FETCH-MESSAGES-REQUEST-SUCCESS': {
      return {
        ...state,
        fetchRequestFailed: false,
        fetchRequestSending: false,
        messages: action.payload.messages,
      };
    }

    case 'SENDING-FETCH-MESSAGES-REQUEST': {
      return {
        ...state,
        messages: [],
        fetchRequestSending: true,
        fetchRequestFailed: false,
      };
    }

    case 'FETCH-MESSAGES-REQUEST-FAILED': {
      return {
        ...state,
        messages: [],
        fetchRequestFailed: true,
        fetchRequestSending: false,
      };
    }

    // Send actions
    case 'SENDING-MESSAGE': {
      return {
        ...state,
        sendingMessage: true,
        sendingMessageFailed: false,
      };
    }

    case 'SENDING-MESSAGE-FAILED': {
      return {
        ...state,
        sendingMessage: false,
        sendingMessageFailed: true,
      };
    }

    case 'APPEND-MESSAGE': {
      return {
        ...state,
        sendingMessage: false,
        messages: [...state.messages, action.payload.message],
        needsScroll: {},
      };
    }

    // DEFAULT ACTION
    default: {
      return state;
    }
  }
};

export default MessagesReducer;
