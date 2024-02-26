import debounce from "debounce";
import { useEffect, useMemo, useRef } from "react";
import * as React from 'react';

export const useDebounce = (callback: Function) => {
    const ref = useRef<Function>();
  
    useEffect(() => {
      ref.current = callback;
    }, [callback]);
  
    const debouncedCallback = useMemo((...args) => {
      const func = (...args) => {
        ref.current?.(...args);
      };
  
      return debounce(func, 1000);
    }, []);
  
    return debouncedCallback;
  };