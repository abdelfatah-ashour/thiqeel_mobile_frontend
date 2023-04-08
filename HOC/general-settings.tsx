import React, { useEffect } from "react";
import { useReduxDispatch } from "../store";
import { fetchGeneralSettings } from "../store/slices/generalSettingsSlice";

export function GeneralSettings({ children }: { children: React.ReactNode }) {
  const dispatch = useReduxDispatch();

  useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, []);

  return <>{children}</>;
}
