import React, { useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styles from '../../sass/main.module.scss';
import ShowMessagesComponent from './ShowMessagesComponent';
import SendMessageComponent from './SendMessageComponent';
import socketHook from '../hooks/useWebSocket';

function MessageComponent() {
  const messagesContainer = useRef(null);
  const selectedContact = useSelector((state) => state.contacts.selectedContact);
  const selectedContactHash = useSelector((state) => state.contacts.selectedContactHash);
  const connection = socketHook(selectedContactHash);

  return (
    <>
      <div ref={messagesContainer} id="messages-block" className={styles.messages}>
        <ShowMessagesComponent
          connection={connection}
          container={messagesContainer}
        />
      </div>

      <div className={styles['send-messages']}>
        <SendMessageComponent
          connection={connection}
          selectedContact={selectedContact}
        />
      </div>
    </>

  );
}

export default MessageComponent;
