<template>
  <div id="home">
    <!-- <a-date-picker @change="onChangeDate" /> -->
    <div class="home-input">
      <a-input placeholder="할 일을 입력해주세요." v-model="contents" />
      <a-button type="primary" @click="submit"> 입력 </a-button>
    </div>
    <div class="check-container" v-for="(item, index) in todoResult" :key="index">
      <a-checkbox @change="onChange"> {{ item.contents }} </a-checkbox>
    </div>
  </div>
</template>

<script>
import todoStore from "../store/todo";

export default {
  name: "Home",

  data() {
    return {
      contents: "",
      todoResult: [],
      todoCount: 0,
      filter: {
        search: "",
        skip: 0,
        take: 10,
        date: "",
      },
    };
  },

  async mounted() {
    await todoStore.dispatch("loadTodo", this.filter);
    this.todoResult = todoStore.state.todoList.todoList;
    this.todoCount = todoStore.state.todoList.totalCount;
  },
  methods: {
    submit() {
      console.log(this.contents);
      if (this.contents === "") {
        this.$error({
          title: "텍스트를 입력해주세요.",
        });
        return;
      }
      todoStore.dispatch("create", this.contents);
    },

    // onChangeDate(date, dateString) {
    //   console.log(date, dateString);
    // },
  },
};
</script>

<style lang="scss">
body * {
  box-sizing: border-box;
  margin: 0;
}

#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: calc(100% * 1 / 3);
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .home-check {
    margin: 20px 0;
  }

  .home-input {
    display: flex;
    margin: 20px 0;
  }

  .check-container {
    background-color: #fff3c9;
    padding: 10px 20px;
    text-align: left;
    border-radius: 2px;
  }
}
</style>
