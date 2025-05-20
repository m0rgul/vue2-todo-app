import { Todo } from "models/todo.model.js";
import { Socket } from "socket.io";

export const registerTodoSocketHandlers = (socket: Socket, io: any) => {
  // 1. GET ALL
  socket.on("get-todos", async () => {
    try {
      const todos = await Todo.find().sort({ createdAt: -1 });
      socket.emit("todos-list", todos);
    } catch (err) {
      console.error("Error fetching todos:", err);
      socket.emit("error", "Failed to fetch todos");
    }
  });

  // 2. ADD
  socket.on("add-todo", async (data: { title: string }) => {
    try {
      const newTodo = await Todo.create({ title: data.title });
      io.emit("todo-added", newTodo);
    } catch (err) {
      console.error("Error adding todo:", err);
      socket.emit("error", "Failed to add todo");
    }
  });

  // 3. UPDATE
  socket.on("update-todo", async (data: { id: string; done: boolean }) => {
    try {
      const updated = await Todo.findByIdAndUpdate(
        data.id,
        { done: data.done },
        { new: true }
      );
      io.emit("todo-updated", updated);
    } catch (err) {
      console.error("Error updating todo:", err);
      socket.emit("error", "Failed to update todo");
    }
  });

  // 4. DELETE
  socket.on("delete-todo", async (id: string) => {
    try {
      await Todo.findByIdAndDelete(id);
      io.emit("todo-deleted", id);
    } catch (err) {
      console.error("Error deleting todo:", err);
      socket.emit("error", "Failed to delete todo");
    }
  });
};
