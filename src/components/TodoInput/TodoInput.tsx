import React, { useRef, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useTodoStore } from '../../store/todoStore';
import { sanitizeInput, capitalizeFirst } from '../../utils/sanitize';
import styles from './TodoInput.module.scss';

const TodoInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') {
      return;
    }

    const input = inputRef.current?.value || '';
    const sanitized = sanitizeInput(input);
    
    if (!sanitized) {
      setError('Enter a task before adding.');
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setError('');
    const capitalized = capitalizeFirst(sanitized);
    addTodo(capitalized);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.input}>
        <AddCircleOutlineIcon className={styles.pen} onClick={handleInput} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Create a new todo ..."
          onKeyDown={handleInput}
          onChange={() => {
            if (error) setError('');
          }}
          autoComplete="off"
          autoFocus
        />
      </div>
      {error && (
        <p role="alert" className={styles.errorMsg}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TodoInput;
