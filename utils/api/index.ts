import Axios, { AxiosError, AxiosResponse } from "axios";
import { axiosArgsType, axiosResponseType } from "../../Types/authentication";
import { AxiosResponseModel } from "../../models/axios";
import { getToken } from "../storage";

const axiosInstance: any = Axios.create({
  baseURL: "https://admin.beta2.thiqeel.com/api/v1",
  withCredentials: false,
  transformRequest: [
    function (data) {
      // Do whatever you want to transform the data
      let payload = new FormData();
      for (let key in data) {
        payload.append(key, data[key]);
      }
      return payload;
    },
  ],
});

axiosInstance.interceptors.request.use(async (config: any) => {
  await getToken().then(token => {
    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token || "")}`;
    }
  });

  config.headers["accept-language"] = "en";

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(
      new AxiosResponseModel(
        response.status,
        response.data.message,
        response.data.data,
        null,
      ),
    );
  },
  (error: AxiosError<any>) => {
    let response = new AxiosResponseModel();

    if (error.response) {
      response = new AxiosResponseModel(
        error.response.status,
        error.response?.data?.message,
        null,
        null,
      );
    } else if (error.request) {
      response = new AxiosResponseModel(
        408,
        "something_went_wrong" || "",
        null,
        null,
      );
    } else {
      response = new AxiosResponseModel(
        500,
        "something_went_wrong_server" || "",
        null,
        null,
      );
    }
    return Promise.reject(response);
  },
);

export const axios: (args?: axiosArgsType) => Promise<axiosResponseType> =
  function (args?: axiosArgsType) {
    return axiosInstance({
      method: args?.method || "GET",
      url: args?.url,
      data: args?.data,
    });
  };
