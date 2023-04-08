import { axios } from ".";

export function fetchGeneralSettingsApi() {
  return axios({ method: "GET", url: "/settings" });
}
