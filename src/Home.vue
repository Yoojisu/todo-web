<template>
  <div id="home">
    <div class="home-date">
      <a-date-picker :default-value="moment().format('YYYY-MM-DD')" @change="onChangeDate" :allowClear="false" />
    </div>
    <div class="home-input">
      <a-input placeholder="할 일을 입력해주세요." v-model="contents" />
      <a-button type="primary" @click="submit"> 입력 </a-button>
    </div>
    <div v-if="todoCount !== 0">
      <div class="check-container" v-for="(item, index) in todoResult" :key="index">
        <div class="check-wrapper">
          <a-checkbox :class="{ selected: item.isChecked }" :checked="item.isChecked" @change="onChange(item)">
            <div>{{ item.contents }}</div>
          </a-checkbox>
          <a-icon @click="onDelete(item.index)" class="check-del" type="delete" />
        </div>
      </div>
    </div>
    <div v-else><a-empty /></div>
    <a-pagination class="home-page" v-model="pagination.current" :page-size="filter.take" :total="todoCount" @change="onChangePagination()" />
  </div>
</template>

<script>
import todoStore from "../store/todo";
import moment from "moment";

export default {
  name: "Home",

  data() {
    return {
      moment: moment,
      contents: "",
      todoResult: [],
      todoCount: 0,
      pagination: {
        current: 1,
      },
      filter: {
        search: "",
        skip: 0,
        take: 10,
        date: moment().format("YYYY-MM-DD"),
      },
    };
  },

  async mounted() {
    await todoStore.dispatch("loadTodo", this.filter);
    this.todoResult = todoStore.state.todoList.todoList;
    this.todoCount = todoStore.state.todoList.totalCount;
  },

  methods: {
    async submit() {
      if (moment().format("YYYY-MM-DD") !== this.filter.date) {
        this.$error({
          title: "오늘 날짜가 아닙니다.",
        });
        return;
      }

      if (this.contents === "") {
        this.$error({
          title: "텍스트를 입력해주세요.",
        });
        return;
      }

      await todoStore.dispatch("create", this.contents);
      await this.getList(this.filter);
      await todoStore.dispatch("loadTodo", this.filter);
      this.todoResult = todoStore.state.todoList.todoList;
      this.todoCount = todoStore.state.todoList.totalCount;
      this.contents = "";
    },

    async onChange(item) {
      item.isChecked = !item.isChecked;

      let todoForm = {
        index: item.index,
        contents: this.contents,
        isChecked: item.isChecked,
      };
      await todoStore.dispatch("updateTodo", todoForm);
    },

    async onChangeDate(date, dateString) {
      this.filter.date = dateString;
      await this.getList(this.filter);
    },

    async onChangePagination() {
      this.filter.skip = this.pagination.current;
      await this.getList(this.filter);
    },

    async onDelete(index) {
      await todoStore.dispatch("deleteTodo", index);
      await this.getList(this.filter);
    },

    async getList(filter) {
      await todoStore.dispatch("loadTodo", filter);
      this.todoResult = todoStore.state.todoList.todoList;
      this.todoCount = todoStore.state.todoList.totalCount;
    },
  },
};
</script>

<style lang="scss">
body * {
  box-sizing: border-box;
  margin: 0;
}

#home {
  .home-check {
    margin: 20px 0;
  }

  .home-date {
    margin: 10px 0;

    .ant-calendar-picker {
      width: 100%;
    }
  }

  .home-input {
    display: flex;
    margin: 10px 0;
  }

  .check-container {
    background-color: #fff3c9;
    padding: 10px 20px;
    text-align: left;
    border-radius: 2px;

    .check-wrapper {
      display: flex;
      flex-direction: row;
      width: 100%;

      .check-del {
        cursor: pointer;
        color: red;
        opacity: 0.5;

        &:hover {
          transition: 0.3s all;
          opacity: 1;
        }
      }
    }

    .ant-checkbox-wrapper {
      display: flex;
      width: 100%;
      &.selected {
        text-decoration: line-through;
      }
    }
  }

  .home-page {
    margin: 10px 0;
  }
}
</style>
