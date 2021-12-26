import axios, { create }  from 'axios';

const port = 5000;
const host = `localhost:${port}`;

const axiosConfig = create({
  baseURL:`http://${host}/api`,
  withCredentials: true,
  headers:{
    Pragma: "no-cache",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  timeout: 30000
});

const axiosClient = axios.create(axiosConfig);

export default class Client {
  static request = async (method, path, params, data, config) => {

    try {
      config = {
        method,
        url: path,
        params,
        data,
        ...config
      };
        
    const response = await axiosClient.request(config);
    return response.data;
     
    } catch(e){
      throw e;
    }
  };

  static get = async (path, params) => {
    return await Client.request("GET", path, params, null);
  };

  static post = async (path, data, config) => {
    return await Client.request("POST", path, null, data, config);
  };

  static paramPost = async (path, params, config) => {
    return await Client.request("POST", path, params, null, config);
  };

  static put = async (path, data, config) => {
    return await Client.request("PUT", path, null, data, config);
  };

  static del = async (path, params) => {
    return await Client.request("DELETE", path, params, null);
  };
}
