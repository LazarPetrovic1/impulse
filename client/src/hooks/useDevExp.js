import { useState } from "react";

function useDevExp(initialValue = false) {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem("isDevExp")) || initialValue
  );
  const toggleDevExp = () => {
    setState(!state);
    localStorage.setItem("isDevExp", !state);
  };
  return [state, toggleDevExp];
}

export default useDevExp;
