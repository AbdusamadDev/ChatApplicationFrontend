// socket.js
import { useEffect, useState } from 'react';

const useSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [url]);

  return socket;
};

export default useSocket;
