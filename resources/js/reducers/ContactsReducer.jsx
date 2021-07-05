const defaultState = {
  contacts: [],
  selectedContact: null,
  selectedContactHash: null,
  fetchContactsSuccess: false,
  fetchRequestFailed: false,
  fetchRequestSending: false,
};

const ContactsReducer = (state = defaultState, action) => {
  switch (action.type) {
    // Fetch actions
    case 'SENDING-FETCH-CONTACTS-REQUEST': {
      return {
        ...state,
        fetchRequestSending: true,
        fetchContactsSuccess: false,
        fetchRequestFailed: false,
      };
    }

    case 'FETCH-CONTACTS-REQUEST-SUCCESS': {
      return {
        ...state,
        fetchContactsSuccess: true,
        fetchRequestFailed: false,
        fetchRequestSending: false,
        contacts: action.payload.contacts,
      };
    }

    case 'FETCH-CONTACTS-REQUEST-FAILED': {
      return {
        ...state,
        fetchRequestFailed: true,
        fetchRequestSending: false,
        fetchContactsSuccess: false,
      };
    }

    // Contact selected actions
    case 'CONTACT-SELECTED': {
      return {
        ...state,
        selectedContact: action.payload.id,
        selectedContactHash: action.payload.hash,
      };
    }

    // DEFAULT ACTION
    default: {
      return state;
    }
  }
};

export default ContactsReducer;
