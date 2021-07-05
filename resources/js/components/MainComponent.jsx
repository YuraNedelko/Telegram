import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styles from '../../sass/main.module.scss';
import ContactsComponent from './ContactsComponent';
import MessageComponent from './MessagesComponent';

function MainComponent() {
  const isLogedIn = useSelector((state) => state.user.isLogedIn, shallowEqual);
  const history = useHistory();

  useEffect(
    () => { if (!isLogedIn) history.push('/'); }, [isLogedIn],
  );

  return (
    <div className={styles['main-component']}>
      <div className={styles['contacts-container']}>
        <ContactsComponent />
      </div>
      <div className={styles['messages-container']}>
        <MessageComponent />
      </div>
    </div>
  );
}

export default MainComponent;
