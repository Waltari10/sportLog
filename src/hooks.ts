import { debounce } from "debounce";
import { useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (f: any, timeout: number) => {
  return useCallback(debounce(f, timeout), []);
};
