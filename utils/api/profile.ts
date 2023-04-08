import { axios } from ".";
import { axiosPayloadType } from "../../Types/authentication";

export function updateProfileAPi(payload: axiosPayloadType) {
  return axios({ method: "POST", url: "/profile/edit", data: payload });
}

export function validMemberApi(payload: axiosPayloadType) {
  return axios({ method: "POST", url: "/validate-email", data: payload });
}

export function inviteMembersApi(payload: axiosPayloadType) {
  return axios({ method: "POST", url: "/invite-members", data: payload });
}

export function fetchProfileApi(url: string) {
  return axios({ method: "GET", url });
}
