import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url: string, parameters: any) => {
  const [data, setData] = useState<any>([]);
  const [links, setLinks] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, { params: parameters });
        setData(res.data.data);
        setLinks(res.data?.meta);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, links, loading, error, reFetch };
};

export default useFetch;
