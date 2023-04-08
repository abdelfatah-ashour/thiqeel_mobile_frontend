import { useState } from "react";
import { showMessageStatusType } from "../Types/shared";

export function useAlert() {
  const [message, setMessage] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [status, setStatus] = useState<
    showMessageStatusType.success | showMessageStatusType.error
  >(showMessageStatusType.success);

  function showMessage(
    message: string,
    status: showMessageStatusType.success | showMessageStatusType.error,
    visibility: boolean,
  ) {
    setMessage(message);
    setStatus(status);
    setVisibility(visibility);
  }

  return {
    message,
    visibility,
    status,
    showMessage,
  };
}
