import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay: number) => {
  const [debounceQuery, setDebounceQuery] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceQuery;
};

export default useDebounce;
