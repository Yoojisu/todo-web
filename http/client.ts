import axios, { Method, AxiosRequestConfig } from "axios";

let port = 5000;
let host = `localhost:${port}`;

const axiosConfig:AxiosRequestConfig = {
  baseURL:`http://${host}/api`,
  withCredentials: true,
  headers:{
    Pragma: "no-cache",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  timeout: 30000
}

const axiosClient = axios.create(axiosConfig);

export default class Client {
  static request = async <T>(
  method: Method,
  path: string,
  params?: any,
  headers?: any,
  data?: any,
  config?: AxiosRequestConfig
  ) =>{
    try {
      config = {
        method,
        url:path,
        params,
        headers,
        data,
        ...config,
      };
      const response = await axiosClient.request(config);
      return response.data as T;
    }catch (error){
      throw error;
    }
  }

  static get = async <T extends any>(
    path: string,
    params?: any,
    headers?: any,
    config?: any
  ) =>{
    return await Client.request<T>("GET", path, params, headers, null, config);
  };

  static put = async <T extends any>(
    path: string,
    data?: any,
    headers?: any
  ) => {
    return await Client.request<T>("PUT", path, null, headers, data);
  };

  static del = async<T extends any>(
    path: string,
    params?: any,
    headers?: any
  ) =>{
    return await Client.request<T>("DELETE", path, params, headers);
  }

}