import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { appendMessage, fetchMessagesSuccess, fetchRequestFailed } from '../actions/MessageActions';
import MessageItem from './MessageItem';

function ShowMessagesComponent({ container, connection }) {
  const dispatch = useDispatch();
  const selectedContact = useSelector((state) => state.contacts.selectedContact);
  const messages = useSelector((state) => state.messages.messages);
  const needsScroll = useSelector((state) => state.messages.needsScroll);
  const isSendingRequest = useSelector((state) => state.messages.fetchRequestSending);
  const isFetchRequestFailed = useSelector((state) => state.messages.fetchRequestFailed);

  useEffect(() => {
    if (connection) {
      connection.on('message', (data) => {
        data.isMine = false;
        dispatch(appendMessage(data));
      });
    }
  }, [connection]);

  function scroll() {
    if (container) {
      container.current.scrollTop = container.current.scrollHeight;
    }
  }

  useEffect(
    () => { scroll(); }, [needsScroll],
  );

  useEffect(() => {
    if (selectedContact) {
      axios.get(`/api/messages/${selectedContact}`)
        .then((response) => {
          if (response.data?.messages) {
            dispatch(fetchMessagesSuccess(response.data.messages));
          }
        })
        .catch((error) => {
          dispatch(fetchRequestFailed());
        });
    }
  }, [selectedContact]);

  const messageItems = messages.map((message) => (
    <MessageItem
      key={message.id}
      message={message.text}
      date={message.date}
      id={message.id}
      isMine={message.isMine}
      from={message.from}
    />
  ));

  return (
    <>
      {isFetchRequestFailed && <div className="error">Error occured</div>}
      {isSendingRequest && <div className="sending-indicator-container"><div className="sending-indicator" /></div>}
      {messageItems}
    </>
  );
}

ShowMessagesComponent.propTypes = {
  container: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  connection: PropTypes.shape({ on: PropTypes.func }),
};

ShowMessagesComponent.defaultProps = {
  connection: null,
};

export default React.memo(ShowMessagesComponent);
