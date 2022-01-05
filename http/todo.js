import Client from "./client";

const path = "/Todo";

export default class Auth  {
  static async loadTodoList (filter){
    return await Client.get(`${path}`, filter);
  }

  static async create (data){
    return await Client.put(`${path}`, {Contents:data});
  }

  static async delete(index){
    return await Client.del(`${path}/${index}`);
  }

  static async update( data){
    return await Client.post(`${path}/${data.index}`,{
      Contents:data.contents,
      IsChecked: data.isChecked
    });
  }
}