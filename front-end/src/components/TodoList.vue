<template>
    <ul class="todo-list">
        <li v-for="todo in todos" :key="todo._id" class="todo-item">
            <input type="checkbox" :checked="todo.done" @change="$emit('toggle', todo)" />
            <span :class="{ done: todo.done }">
                {{ todo.title }}
            </span>
            <button @click="$emit('remove', todo._id)" class="delete-btn" aria-label="Remove" :disabled="loading">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        todos: {
            type: Array,
            required: true
        }
    }
};
</script>

<style scoped>
.todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #eee;
}

.todo-item input[type="checkbox"] {
    margin-right: 10px;
}

.todo-item span {
    flex: 1;
}

.todo-item span.done {
    text-decoration: line-through;
    color: #aaa;
}

.delete-btn {
    background: transparent;
    border: none;
    color: #888;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.delete-btn:hover {
    color: #d00;
}
</style>