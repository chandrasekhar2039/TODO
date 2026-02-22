import React, { useRef } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { toast } from 'react-toastify';
import { useTodoStore } from '../../store/todoStore';
import { sanitizeInput, capitalizeFirst } from '../../utils/sanitize';
import styles from './TodoInput.module.scss';

const TodoInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') {
      return;
    }

    const input = inputRef.current?.value || '';
    const sanitized = sanitizeInput(input);
    
    if (!sanitized) {
      toast.error('No Task Entered', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    const capitalized = capitalizeFirst(sanitized);
    addTodo(capitalized);
  };

  return (
    <div className={styles.input}>
      <AddCircleOutlineIcon className={styles.pen} onClick={handleInput} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Create a new todo ..."
        onKeyDown={handleInput}
        autoComplete="off"
        autoFocus
      />
    </div>
  );
};

export default TodoInput;
