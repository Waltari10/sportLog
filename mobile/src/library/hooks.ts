import { useCallback } from "react";
import { debounce } from "debounce";

export const useDebounce = (f: any, timeout: number, deps: unknown[] = []) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(debounce(f, timeout), deps);
};
