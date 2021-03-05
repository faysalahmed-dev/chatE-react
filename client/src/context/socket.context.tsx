import React, { createContext } from 'react';
import socket from 'socket.io-client';

export const io = socket('http://localhost:4555');

type SocketI = SocketIOClient.Socket;

export const SocketContext = createContext<SocketI>(io as SocketI);

const SocketProvider: React.FC<{}> = ({ children }) => {
   return (
      <SocketContext.Provider value={io}>{children}</SocketContext.Provider>
   );
};

export default SocketProvider;
