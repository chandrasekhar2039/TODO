import { Todo } from '../types/todo';

const STORAGE_KEY = 'list';

export const getTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate that it's an array
      if (Array.isArray(parsed)) {
        // Validate each item has required fields
        return parsed.filter(
          (item): item is Todo =>
            item &&
            typeof item === 'object' &&
            typeof item.id === 'string' &&
            typeof item.task === 'string' &&
            typeof item.completed === 'boolean'
        );
      }
    }
  } catch (error) {
    console.error('Error reading todos from localStorage:', error);
  }
  return [];
};

export const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to localStorage:', error);
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      throw new Error('Storage quota exceeded. Please clear some todos.');
    }
    throw error;
  }
};
