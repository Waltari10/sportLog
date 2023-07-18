import { useCallback, useEffect, useRef } from "react";
import { debounce } from "debounce";

export const useDebounce = <T>(f: T, timeout: number, deps: unknown[] = []) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/ban-types
  return useCallback(debounce(f as Function, timeout), deps) as T;
};

/**
 * Takes in value and returns it's value on previous React component render
 */
export const usePreviousRenderValue = <T>(value: T) => {
  const prevTextRef = useRef<T>(value);

  useEffect(() => {
    prevTextRef.current = value;
  }, [value]);

  return prevTextRef.current;
};
