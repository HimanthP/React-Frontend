import { useState, useEffect } from "react";

// @customHook
const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // ignore
    }
  }, [key, storedValue]);

  const setValue = (value: T | ((prev: T) => T)): void => {
    setStoredValue((prev) => {
      const next =
        typeof value === "function"
          ? (value as (prev: T) => T)(prev)
          : value;
      return next;
    });
  };

  return [storedValue, setValue];
};

export { useLocalStorage };
export default useLocalStorage;