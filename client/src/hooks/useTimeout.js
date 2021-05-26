import { useEffect, useCallback, useRef } from 'react';

// React hook for delaying calls with time
// returns callback to use for cancelling

const useTimeout = (callback, timeout = 5000) => {
  const timeoutIdRef = useRef();
  const cancel = useCallback(() => {
  const timeoutId = timeoutIdRef.current;
    if (timeoutId) {
      timeoutIdRef.current = undefined;
      clearTimeout(timeoutId);
    }
  }, [timeoutIdRef]);
  useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, timeout);
    return cancel;
    // eslint-disable-next-line
  }, []);
  return cancel;
}

export default useTimeout;
