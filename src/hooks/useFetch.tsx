import { useState, useRef, useCallback, useEffect } from 'react';

type UseFetchResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const useFetch = <T,>(url: string): UseFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const load = useCallback(async () => {
    if (!url) return 

    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { signal: controller.signal });

      if (!response.ok) throw new Error('Request failed');

      const fetchedData = (await response.json()) as T;

      setData(fetchedData);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;

      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      if (abortControllerRef.current === controller) {
        setLoading(false);
      }
    }
  }, [url]);

  useEffect(() => {
    load();

    return () => abortControllerRef.current?.abort();
  }, [load]);

  return { data, loading, error, refresh: load };
};

export default useFetch;
