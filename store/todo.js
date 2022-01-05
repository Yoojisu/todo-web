import Vuex from 'vuex';
import Todo from "../http/todo";
import Vue from 'vue';

Vue.use(Vuex);

const todo = new Vuex.Store({
  namespace:true,
  state:{
    todoList:[]
  },
  mutations:{
    loadTodo(state,todoList){
      state.todoList = todoList;
    }
  },
  actions:{
   async create({commit}, contents){
      await Todo.create(contents);
    },
  
    async loadTodo({commit}, filter){
      let result = await Todo.loadTodoList(filter);
      commit('loadTodo', result);
    },

    async updateTodo({commit}, data){
     let result = await Todo.update(data);
     console.log(result);
      commit('loadTodo', result);
    }
},
})

export default todo;