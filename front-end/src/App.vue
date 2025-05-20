<template>
  <div class="app">
    <h1>Vue 2 Todo App</h1>

    <TodoForm @add="addTodo" />
    <TodoList :todos="todos" @toggle="toggleTodo" @remove="removeTodo" />
  </div>
</template>

<script>
import socket from "./socket";


import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';

export default {

  components: { TodoForm, TodoList },

  data() {
    return {
      todos: [],
      loading: false
    };
  },
  mounted() {
    socket.emit("get-todos");

    socket.on("todos-list", (data) => {
      this.todos = data;
    });

    socket.on("todo-added", (todo) => {
      this.todos.push(todo);
    });

    socket.on("todo-updated", (updated) => {
      const index = this.todos.findIndex((t) => t._id === updated._id);
      if (index !== -1) this.todos.splice(index, 1, updated);
    });

    socket.on("todo-deleted", (id) => {
      this.todos = this.todos.filter((t) => t._id !== id);
    });
  },
  methods: {
    addTodo(title) {
      if (title) {
        socket.emit("add-todo", { title });
        this.newTodo = "";
      }
    },
    toggleTodo(todo) {
      socket.emit("update-todo", { id: todo._id, done: todo.done });
    },
    removeTodo(id) {
      socket.emit("delete-todo", id);
    }

  },
  beforeDestroy() {
    socket.off("todos-list");
    socket.off("todo-added");
    socket.off("todo-updated");
    socket.off("todo-deleted");
  }
}
</script>

<style scoped>
.app {
  max-width: 600px;
  margin: 60px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  color: #666;
  margin-bottom: 10px;
}
</style>
