import { useCallback } from "react";
import { debounce } from "debounce";

export const useDebounce = <T>(f: T, timeout: number, deps: unknown[] = []) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/ban-types
  return useCallback(debounce(f as Function, timeout), deps) as T;
};
