import { useEffect, useState } from 'react';
import socket from 'socket.io-client';

function useWebSocket(contact) {
  const [connection, setConnection] = useState(null);

  useEffect(
    () => {
      let socketConnection;
      if (contact) {
        socketConnection = socket.connect('http://localhost:2223', {
          query: `contact=${contact}`,
        });
        setConnection(socketConnection);
      }

      return () => {
        if (socketConnection) {
          socketConnection.disconnect();
        }
      };
    }, [contact],
  );

  return connection;
}

export default useWebSocket;
