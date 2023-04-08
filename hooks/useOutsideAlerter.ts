import { RefObject, useEffect } from "react";

export function useOutsideAlerter({
  ref,
  callback,
}: {
  ref: RefObject<HTMLElement>;
  callback: (event: MouseEvent) => void;
}) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, ref]);
}
