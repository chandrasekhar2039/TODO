import { Todo } from '../types/todo';

const DB_NAME = 'TodoAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'todos';

interface IDBRequestEventTarget extends EventTarget {
  result: IDBDatabase;
}

interface IDBRequest extends EventTarget {
  onsuccess: ((this: IDBRequest, ev: Event) => void) | null;
  onerror: ((this: IDBRequest, ev: Event) => void) | null;
  result: any;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Failed to open IndexedDB'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBRequestEventTarget).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        });
        objectStore.createIndex('completed', 'completed', { unique: false });
      }
    };
  });
};

export const getTodosFromIndexedDB = async (): Promise<Todo[]> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(new Error('Failed to read todos from IndexedDB'));
      };
    });
  } catch (error) {
    console.error('Error reading from IndexedDB:', error);
    return [];
  }
};

export const saveTodosToIndexedDB = async (todos: Todo[]): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Clear existing todos
      store.clear();

      // Add all todos
      todos.forEach((todo) => {
        store.add(todo);
      });

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        reject(new Error('Failed to save todos to IndexedDB'));
      };
    });
  } catch (error) {
    console.error('Error saving to IndexedDB:', error);
    throw error;
  }
};

export const syncWithLocalStorage = async (): Promise<void> => {
  try {
    // Read from localStorage
    const stored = localStorage.getItem('list');
    if (stored) {
      const todos: Todo[] = JSON.parse(stored);
      // Save to IndexedDB
      await saveTodosToIndexedDB(todos);
    }
  } catch (error) {
    console.error('Error syncing with localStorage:', error);
  }
};
