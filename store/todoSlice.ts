import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../types/todo';

// Functie om todos uit localStorage te laden
const loadTodosFromStorage = (): Todo[] => {
  if (typeof window !== 'undefined') {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  }
  return [];
};

interface TodoState {
  todos: Todo[];
  editingId: number | null;
  editingText: string;
}

const initialState: TodoState = {
  todos: loadTodosFromStorage(),
  editingId: null,
  editingText: '',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      // Opslaan in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        // Opslaan in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('todos', JSON.stringify(state.todos));
        }
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      // Opslaan in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        // Opslaan in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('todos', JSON.stringify(state.todos));
        }
      }
      state.editingId = null;
      state.editingText = '';
    },
    startEditing: (state, action: PayloadAction<{ id: number; text: string }>) => {
      state.editingId = action.payload.id;
      state.editingText = action.payload.text;
    },
    updateEditingText: (state, action: PayloadAction<string>) => {
      state.editingText = action.payload;
    },
    cancelEditing: (state) => {
      state.editingId = null;
      state.editingText = '';
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  startEditing,
  updateEditingText,
  cancelEditing,
} = todoSlice.actions;

export default todoSlice.reducer; 