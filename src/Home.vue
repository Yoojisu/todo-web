<template>
  <div class="home-container" id="home">
    <div class="home-date" df fdc>
      <div class="home-title">
        <div class="fs-20 bold ta-l">{{ filter.date }}</div>
        <div v-if="dayText" class="ta-l fs-12">{{ getDay }}</div>
        <div class="ta-l mint fs-12">할 일이 {{ getCount }}개 남았습니다.</div>
      </div>

      <a-date-picker :default-value="moment().format('YYYY-MM-DD')" @change="onChangeDate" :allowClear="false" />
    </div>
    <div class="home-input">
      <a-input placeholder="할 일을 입력해주세요." v-model="contents" />
      <a-button type="primary" @click="submit"> 입력 </a-button>
    </div>
    <div class="home-list">
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
    </div>
    <div>
      <base-todo :listLoading.sync="isLoading"></base-todo>
    </div>
    <a-pagination class="home-page" v-model="pagination.current" :page-size="filter.take" :total="todoCount" @change="onChangePagination()" />
  </div>
</template>

<script>
import todoStore from "../store/todo";
import moment from "moment";
import BaseTodo from "./assets/layouts/BaseTodo.vue";
import dateUtils from "../utils/dateTransform";

export default {
  name: "Home",
  components: {
    BaseTodo,
  },

  data() {
    return {
      moment: moment,
      contents: "",
      todoResult: [],
      todoCount: 0,
      todoDoneCount: 0,
      pagination: {
        current: 1,
      },
      filter: {
        search: "",
        skip: 0,
        take: 10,
        date: moment().format("YYYY-MM-DD"),
      },
      isLoading: true,
      dayText: "",
    };
  },

  async mounted() {
    try {
      this.isLoading = true;
      await todoStore.dispatch("loadTodo", this.filter);
      this.todoResult = todoStore.state.todoList.todoList;
      this.todoCount = todoStore.state.todoList.totalCount;
      this.dayText = dateUtils.dayTransform(moment(this.filter.data).day());
      this.getCount = this.todoResult;
    } finally {
      this.isLoading = false;
    }
  },

  computed: {
    getDay: {
      get() {
        return this.dayText;
      },
      set(value) {
        this.dayText = dateUtils.dayTransform(moment(value).day());
      },
    },

    getCount: {
      get() {
        return this.todoCount - this.todoDoneCount;
      },
      set(value) {
        this.todoDoneCount = value.filter((data) => data.isChecked).length;
      },
    },
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
      this.getDay = dateString;
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
@import "~/src/assets/styles/flex.scss";
@import "~/src/assets/styles/box.scss";
@import "~/src/assets/styles/color.scss";
@import "~/src/assets/styles/font.scss";
@import "~/src/assets/styles/response.scss";

.home-container {
  margin: 0 auto;
  width: calc(100% * 1 / 3) !important;

  @include response("tablet") {
    width: calc(100% * 2 / 3) !important;
  }

  @include backgroundBox(10px, $white-1);
  padding: 30px 20px;

  .home-check {
    margin: 20px 0;
  }

  .home-date {
    .home-title {
      margin-bottom: 20px;
    }

    .ant-calendar-picker {
      width: 100%;
    }
  }

  .home-input {
    display: flex;
    margin: 10px 0;
  }

  .home-list {
    padding: 20px;
  }

  .check-container {
    padding: 5px 0;
    text-align: left;

    .check-wrapper {
      display: flex;
      flex-direction: row;
      width: 100%;

      .ant-checkbox-wrapper {
        align-items: center;
      }

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
        color: $light-gray-2;
        opacity: 0.8;
      }
    }
  }

  .home-page {
    margin: 10px 0;
  }
}
</style>
