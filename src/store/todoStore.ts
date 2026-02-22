import { create } from 'zustand';
import { Todo, FilterType } from '../types/todo';
import { getTodosFromStorage, saveTodosToStorage } from '../utils/storage';
import { saveTodosToIndexedDB, syncWithLocalStorage } from '../utils/indexedDB';

export const filterTodos = (todos: Todo[], filter: FilterType): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

interface TodoStore {
  todos: Todo[];
  filter: FilterType;
  addTodo: (task: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  clearCompleted: () => void;
  setFilter: (filter: FilterType) => void;
  getActiveCount: () => number;
}

export const useTodoStore = create<TodoStore>((set, get) => {
  // Initialize from localStorage and sync with IndexedDB
  const initialTodos = getTodosFromStorage();
  
  // Sync with IndexedDB in background
  if (typeof window !== 'undefined' && 'indexedDB' in window) {
    syncWithLocalStorage().catch(console.error);
  }

  const saveTodos = async (todos: Todo[]) => {
    saveTodosToStorage(todos);
    // Also save to IndexedDB for offline support
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      try {
        await saveTodosToIndexedDB(todos);
      } catch (error) {
        console.error('Failed to save to IndexedDB:', error);
      }
    }
  };

  return {
    todos: initialTodos,
    filter: 'all',

    addTodo: (task: string) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        task,
        completed: false,
      };
      set((state) => {
        const newTodos = [...state.todos, newTodo];
        saveTodos(newTodos);
        return { todos: newTodos };
      });
    },

    deleteTodo: (id: string) => {
      set((state) => {
        const newTodos = state.todos.filter((todo) => todo.id !== id);
        saveTodos(newTodos);
        return { todos: newTodos };
      });
    },

    toggleTodo: (id: string) => {
      set((state) => {
        const newTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodos(newTodos);
        return { todos: newTodos };
      });
    },

    clearCompleted: () => {
      set((state) => {
        const newTodos = state.todos.filter((todo) => !todo.completed);
        saveTodos(newTodos);
        return { todos: newTodos };
      });
    },

    setFilter: (filter: FilterType) => {
      set({ filter });
    },

    getActiveCount: () => {
      return get().todos.filter((todo) => !todo.completed).length;
    },
  };
});
