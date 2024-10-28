import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  upcomingToDosCount: 0,
  todayToDosCount: 0,
  priority: {
    high: 0,
    medium: 0,
    low: 0,
  },
  todos: [],
};

export const toDoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToDo: (state, action) => {
      const todo = { ...action.payload, id: nanoid() };
      state.todos.push(todo);
    },
    toggleComplete: (state, action) => {
      const task = state.todos.find((task) => task.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    },
    updateToDo: (state, action) => {
      console.log("hi");
      const { id, newTask } = action.payload;
      const task = state.todos.find((task) => task.id === id);
      console.log(task);
      console.log(id);
      if (task) {
        console.log(newTask);
        Object.assign(task, newTask);
      }
    },
    deleteToDo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addToDo, getToDo, updateToDo, deleteToDo, toggleComplete } =
  toDoSlice.actions;
export default toDoSlice.reducer;