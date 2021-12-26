import Client from "./client";

const path = "/Auth";

export default class Auth  {
  static async login (id, password){
    return await Client.post(`${path}/login`, {id, password});
  }

  static async logout(){
    return await Client.get(`${path}/login`);
  }

  static async self(){
    return await Client.get(`${path}/login`);
  }
}