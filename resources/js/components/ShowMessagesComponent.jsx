import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from '../axios';
import {
  appendMessage, fetchMessagesSuccess, fetchMoreMessagesSuccess, fetchRequestFailed,
} from '../actions/MessageActions';
import MessageItem from './MessageItem';

function ShowMessagesComponent({ container, connection }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.messages);
  const isSendingRequest = useSelector((state) => state.messages.fetchRequestSending);
  const isFetchRequestFailed = useSelector((state) => state.messages.fetchRequestFailed);
  const needsScroll = useSelector((state) => state.messages.needsScroll);
  const currentPage = useSelector((state) => state.messages.currentPage);
  const lastPage = useSelector((state) => state.messages.lastPage);
  const selectedContact = useSelector((state) => state.contacts.selectedContact);
  const consistentPaginationLastId = useSelector((state) => state.messages.consistentPaginationLastId);

  function scrollBottom(newMessages = false, element = null) {
    if (container) {
      if (newMessages) {
        element.scrollIntoView({ behavior: 'auto' });
      } else {
        container.current.scrollTop = container.current.scrollHeight;
      }
    }
  }

  function makeApiCall(address, isInitialFetch = true, el) {
    axios.get(`${address}`)
      .then((response) => {
        if (response?.data?.messagesInfo?.messages && response?.data?.meta) {
          if (isInitialFetch) {
            dispatch(fetchMessagesSuccess(response.data.messagesInfo.messages,
              response.data.meta.current_page, response.data.meta.last_page,
              response.data.messagesInfo.messages?.[0].id));
            scrollBottom();
          } else {
            dispatch(fetchMoreMessagesSuccess(response.data.messagesInfo.messages,
              response.data.meta.current_page, response.data.meta.last_page));
            scrollBottom(true, el);
          }
        }
      })
      .catch((error) => {
        dispatch(fetchRequestFailed());
      });
  }

  const observedElement = useRef(null);

  const ref = useCallback((el) => {
    const callback = () => {
      if (selectedContact && !(currentPage + 1 > lastPage)) {
        makeApiCall(`/api/messages/${selectedContact}?page=${currentPage + 1}&consistentPaginationLastId=${consistentPaginationLastId}`, false, el);
      }
    };

    if (observedElement.current) {
      observedElement.current.disconnect();
    }

    if (el) {
      observedElement.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });
      observedElement.current.observe(el);
    }
  }, [selectedContact, currentPage, lastPage]);

  useEffect(() => {
    if (selectedContact) {
      makeApiCall(`/api/messages/${selectedContact}`, true);
    }
  }, [selectedContact]);

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

  const messageItems = messages.map((message, i) => {
    if (i === 0) {
      return (
        <MessageItem
          reference={ref}
          key={message.id}
          message={message.text}
          date={message.date}
          id={message.id}
          isMine={message.isMine}
          from={message.from}
        />
      );
    }
    return (
      <MessageItem
        key={message.id}
        message={message.text}
        date={message.date}
        id={message.id}
        isMine={message.isMine}
        from={message.from}
      />
    );
  });

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
