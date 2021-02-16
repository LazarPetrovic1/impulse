import React, { createContext } from 'react'
import io from 'socket.io-client';
import thunder from '../assets/sound-effects/notifs/thunder.wav';
const socket = io.connect(`http://localhost:5000`)

export const SocketContext = createContext()

export function SocketProvider({ children }) {
  const playEffect = () => {
    const impulseNotif = new Audio(thunder);
    impulseNotif.play()
  }
  return (
    <SocketContext.Provider value={{ socket, playEffect }}>{children}</SocketContext.Provider>
  )
};
