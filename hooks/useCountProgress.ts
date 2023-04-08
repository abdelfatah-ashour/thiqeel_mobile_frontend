import { useEffect, useState } from "react";

export const useCountProgress = ({ target = 1, timeInterval = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let setCountProgress = setInterval(() => {
      if (count < target) {
        setCount(prev => ++prev);
      }
    }, timeInterval);

    return () => {
      clearInterval(setCountProgress);
    };
  }, [count, target, timeInterval]);

  return {
    count,
  };
};
