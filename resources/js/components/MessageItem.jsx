import React from 'react';
import styles from '../../sass/message.item.module.scss';

function MessageItem({
  reference, message, from, isMine, date, id,
}) {
  function formatDate(originalFormat) {
    const unformatedDate = new Date(originalFormat);
    return `${unformatedDate.getUTCFullYear()}/${
      (`0${unformatedDate.getUTCMonth() + 1}`).slice(-2)}/${
      (`0${unformatedDate.getUTCDate()}`).slice(-2)} ${
      (`0${unformatedDate.getUTCHours()}`).slice(-2)}:${
      (`0${unformatedDate.getUTCMinutes()}`).slice(-2)}:${
      (`0${unformatedDate.getUTCSeconds()}`).slice(-2)}`;
  }

  return (
    <div ref={reference} className={isMine ? `${styles['message-container']} ${styles['my-message']}` : styles['message-container']}>
      <div className={styles.from}>{from}</div>
      <div className={styles.message}>{message}</div>
      <div className={styles.date}>{formatDate(date)}</div>
    </div>

  );
}

export default React.memo(MessageItem);
