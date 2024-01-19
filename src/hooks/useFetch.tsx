import { useEffect, useState } from "react";

type FetchMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function useFetch<T = unknown, B extends Record<string, unknown> | null = null>(
  url: string | undefined,
  method: FetchMethod = "GET",
  body: B = null as B
): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method,
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error(`Something went wrong: ${response.status}`);
        }

        const data = await response.json();

        setData(data);
      } catch (error) {
        setError("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]);

  return { data, loading, error };
}

export default useFetch;
