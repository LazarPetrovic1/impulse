import React, { createContext } from "react";
import useDevExp from "../hooks/useDevExp";
export const DevContext = createContext();

export function DevProvider(props) {
  const [isDevExp, toggleDevExp] = useDevExp();

  return (
    <DevContext.Provider value={{ isDevExp, toggleDevExp }}>
      {props.children}
    </DevContext.Provider>
  );
}
