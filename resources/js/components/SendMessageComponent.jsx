import React from 'react';
import axios from 'axios';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styles from '../../sass/send.message.module.scss';
import { appendMessage, sendingMessageFailed, sendingMessage } from '../actions/MessageActions';

function SendMessageComponent({ connection, selectedContact }) {
  const errorSending = useSelector((state) => state.messages.sendingMessageFailed);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    if (data.get('text') && data.get('text').length > 0) {
      data.append('to', selectedContact);
      dispatch(sendingMessage());
      axios.post('/api/messages', data)
        .then((response) => {
          if (response.data?.message) {
            connection.emit('message', response.data.message);
            dispatch(appendMessage(response.data.message));
          } else {
            dispatch(sendingMessageFailed());
          }
        })
        .catch((error) => {
          dispatch(sendingMessageFailed());
        });
    }
  }

  if (selectedContact) {
    return (
      <div className={styles['sending-message-container']}>
        <form onSubmit={handleSubmit}>
          <input maxLength="255" className={styles['sending-message-input']} name="text" />
          <input className={styles['sending-message-button']} type="submit" value="Send" />
          <div className={styles['error-container']}>
            <div className={styles.error}>
              {errorSending && 'Error while sending message'}
            </div>
          </div>
        </form>
      </div>
    );
  }
  return ('');
}

export default React.memo(SendMessageComponent);
