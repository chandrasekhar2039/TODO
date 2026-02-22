import React from 'react';
import { Checkbox, ListItem, ListItemText } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Todo } from '../../types/todo';
import { useTodoStore } from '../../store/todoStore';
import styles from './TodoItem.module.scss';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <ListItem className={styles.listItem}>
      <Checkbox
        edge="start"
        className={styles.listcheck}
        color="primary"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {!todo.completed ? (
        <ListItemText className={styles.listTxt}>
          {todo.task}
        </ListItemText>
      ) : (
        <ListItemText className={styles.listTxtDone}>
          {todo.task}
        </ListItemText>
      )}
      <ClearIcon className={styles.clear} onClick={() => deleteTodo(todo.id)} />
    </ListItem>
  );
};

export default TodoItem;
