import React, { createContext } from "react";
import io from "socket.io-client";
import thunder from "../assets/sound-effects/notifs/thunder.wav";
let socket;
if (React.isDevelopment) {
  socket = io.connect(`http://localhost:5000`);
} else {
  socket = io.connect("fathomless-thicket-93057.herokuapp.com:80");
  socket.emit("MsgType", "Payload");
}

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const playEffect = () => {
    const impulseNotif = new Audio(thunder);
    impulseNotif.play();
  };
  return (
    <SocketContext.Provider value={{ socket, playEffect }}>
      {children}
    </SocketContext.Provider>
  );
}

export { socket };
