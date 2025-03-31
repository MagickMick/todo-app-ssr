"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleTodo, deleteTodo, editTodo } from '../store/todoSlice';
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';

export default function Home() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  // Voorkom hydration problemen door client-side rendering
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id: number, text: string) => {
    dispatch(editTodo({ id, text }));
  };

  // Toon een loading state tijdens server-side rendering
  if (!isClient) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Todo App</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="space-y-3">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Todo App</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <TodoInput />
          <TodoList
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
          />
        </div>
      </div>
    </main>
  );
}
