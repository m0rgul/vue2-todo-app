<template>
  <div class="app">
    <h1>Vue 2 Todo App</h1>

    <LoadingOverlay v-if="loading" />

    <TodoForm @add="addTodo" />
    <TodoList v-if="!loading" :todos="todos" @toggle="toggleTodo" @remove="removeTodo" />
  </div>
</template>

<script>
import axios from 'axios';

import LoadingOverlay from './components/LoadingOverlay.vue';
import TodoForm from './components/TodoForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: { LoadingOverlay, TodoForm, TodoList },
  data() {
    return {
      todos: [],
      loading: false
    };
  },
  methods: {
    async fetchTodos() {
      this.loading = true;

      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // simulate network delay to show off :D
        const res = await axios.get('http://localhost:8080/api/todos');
        this.todos = res.data;
      } catch (err) {
        console.error('Fetch failed:', err);
      } finally {
        this.loading = false;
      }
    },

    async addTodo(title) {
      const res = await axios.post('http://localhost:8080/api/todos', { title });
      this.todos.unshift(res.data);
    },

    async toggleTodo(todo) {
      const res = await axios.put(`http://localhost:8080/api/todos/${todo._id}`, {
        done: !todo.done
      });
      const idx = this.todos.findIndex(t => t._id === res.data._id);
      this.$set(this.todos, idx, res.data);
    },

    async removeTodo(id) {
      await axios.delete(`http://localhost:8080/api/todos/${id}`);
      this.todos = this.todos.filter(t => t._id !== id);
    }
  },

  created() {
    this.fetchTodos();
  }
};
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
