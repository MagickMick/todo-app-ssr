"use client";

import React from 'react';
import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, text: string) => void;
}

export default function TodoList({ 
  todos, 
  onToggleTodo, 
  onDeleteTodo, 
  onEditTodo
}: TodoListProps) {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="space-y-6 mt-8">
      {/* Actieve taken */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">To-Do</h2>
        <ul className="space-y-2">
          {activeTodos.map(todo => (
            <li key={todo.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <TodoItem
                todo={todo}
                onToggle={onToggleTodo}
                onDelete={onDeleteTodo}
                onEdit={onEditTodo}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Voltooide taken */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Completed</h2>
        <ul className="space-y-2">
          {completedTodos.map(todo => (
            <li key={todo.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <TodoItem
                todo={todo}
                onToggle={onToggleTodo}
                onDelete={onDeleteTodo}
                onEdit={onEditTodo}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 