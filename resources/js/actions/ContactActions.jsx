// Fetch actions
export function sendingFetchRequest() {
  return {
    type: 'SENDING-FETCH-CONTACTS-REQUEST',
  };
}

export function fetchRequestSuccess({ contacts }) {
  return {
    type: 'FETCH-CONTACTS-REQUEST-SUCCESS',
    payload: { contacts },
  };
}

export function fetchRequestFailed() {
  return {
    type: 'FETCH-CONTACTS-REQUEST-FAILED',
  };
}

// Select contact actions
export function contactSelected(id, hash) {
  return {
    type: 'CONTACT-SELECTED',
    payload: { id, hash },
  };
}
