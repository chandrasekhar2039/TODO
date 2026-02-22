import React, { useMemo } from 'react';
import { List } from '@mui/material';
import { useTodoStore } from '../../store/todoStore';
import TodoItem from '../TodoItem/TodoItem';
import EmptyState from '../EmptyState/EmptyState';
import styles from './TodoList.module.scss';

const TodoList: React.FC = () => {
  const filteredTodos = useTodoStore((state) => state.getFilteredTodos());
  const todos = useTodoStore((state) => state.todos);

  const todoItems = useMemo(() => {
    return filteredTodos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} />
    ));
  }, [filteredTodos]);

  return (
    <List className={styles.list}>
      {todos.length > 0 ? todoItems : <EmptyState />}
    </List>
  );
};

export default TodoList;
