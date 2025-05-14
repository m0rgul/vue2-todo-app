<template>
    <form @submit.prevent="submit" class="todo-form">
        <input v-model="title" placeholder="Add a todo..." />
        <button type="submit" :disabled="loading || !title">Add</button>
    </form>
</template>

<script>
export default {
    name: 'TodoForm',
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            title: ''
        };
    },
    methods: {
        submit() {
            const trimmed = this.title.trim();
            if (!trimmed) return;
            this.$emit('add', trimmed);
            this.title = '';
        }
    }
};
</script>

<style scoped>
.todo-form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.todo-form input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.todo-form button {
    padding: 8px 16px;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.todo-form button:hover {
    background: #369f6e;
}

.todo-form button:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style>