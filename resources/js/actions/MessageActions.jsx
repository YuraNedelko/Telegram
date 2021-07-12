// Fetch actions
export function fetchMessagesSuccess(messages, current, last) {

  return {
    type: 'FETCH-MESSAGES-REQUEST-SUCCESS',
    payload: { messages: messages.reverse(), current, last },
  };
}

export function fetchMoreMessagesSuccess(messages, current, last) {
  return {
    type: 'FETCH-MORE-MESSAGES-REQUEST-SUCCESS',
    payload: { messages: messages.reverse(), current, last },
  };
}


export function sendingFetchRequest() {
  return {
    type: 'SENDING-FETCH-MESSAGES-REQUEST',
  };
}

export function fetchRequestFailed() {
  return {
    type: 'FETCH-MESSAGES-REQUEST-FAILED',
  };
}

// Sending message actions
export function sendingMessage() {
  return {
    type: 'SENDING-MESSAGE',
  };
}

export function sendingMessageFailed() {
  return {
    type: 'SENDING-MESSAGE-FAILED',
  };
}

export function appendMessage(message) {
  return {
    type: 'APPEND-MESSAGE',
    payload: { message },
  };
}
