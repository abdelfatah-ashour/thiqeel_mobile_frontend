import { useEffect, useState } from "react";
import { axios } from "../utils/api";

export function useFetchData({ url }: { url: string }) {
  console.log("🚀 > file: useFetchData.ts:5 > useFetchData > url : ", url);
  const [data, setData] = useState<{
    [key: string]: any;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setLoading(true);

    axios({
      method: "GET",
      url,
    })
      .then(({ message, data }) => {
        setData(data);
        setLoading(false);
        setMessage(message);
      })
      .catch(({ message }) => {
        setError(message);
        setLoading(false);
        setMessage(message);
      });
  }, [url]);

  return { data, setData, loading, error, message };
}
