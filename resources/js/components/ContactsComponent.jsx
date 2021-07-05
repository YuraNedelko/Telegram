import React, { useEffect } from 'react';
import {
  useDispatch, useSelector, shallowEqual,
} from 'react-redux';
import axios from 'axios';
import { fetchRequestSuccess } from '../actions/ContactActions';
import ContactItem from './ContactItem';

function ContactsComponent() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts, shallowEqual);
  const isSendingRequest = useSelector((state) => state.contacts.fetchRequestSending,
    shallowEqual);
  const isFetchRequestFailed = useSelector((state) => state.contacts.fetchRequestFailed,
    shallowEqual);
  const selectedContact = useSelector((state) => state.contacts.selectedContact,
    shallowEqual);

  useEffect(() => {
    axios.get('/api/contacts')
      .then((response) => {
        if (response.data) {
          dispatch(fetchRequestSuccess(response.data));
        }
      })
      .catch((error) => {
        // dispatch(loginRequestFailed());
      });
  }, [dispatch]);

  const contactItems = contacts.map((contact) => (
    <ContactItem
      key={contact.id}
      contact={contact}
      selectedContact={contact.id === selectedContact}
    />
  ));

  return (
    <>
      {isFetchRequestFailed && <div className="error">Error occured</div>}
      {isSendingRequest && <div className="sending-indicator-container"><div className="sending-indicator" /></div>}
      {contactItems}
    </>
  );
}

export default ContactsComponent;
