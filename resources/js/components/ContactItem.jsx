import React from 'react';
import { useDispatch } from 'react-redux';
import { contactSelected } from '../actions/ContactActions';
import styles from '../../sass/contact.item.module.scss';

function ContactItem({ contact, selectedContact, index }) {
  const dispatch = useDispatch();

  function setContact() {
    dispatch(contactSelected(contact.id, contact.contactHash));
  }

  return (
    <div
      tabIndex={index}
      className={selectedContact ? `${styles.contact} 
    ${styles['selected-contact']}` : styles.contact}
      role="link"
      onClick={setContact}
      onKeyDown={setContact}
      key={contact.id}
    >
      {contact.name}
    </div>
  );
}

export default React.memo(ContactItem);
