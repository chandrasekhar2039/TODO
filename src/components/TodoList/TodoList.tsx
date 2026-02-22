import React, { useMemo } from 'react';
import { List } from '@mui/material';
import { filterTodos, useTodoStore } from '../../store/todoStore';
import TodoItem from '../TodoItem/TodoItem';
import EmptyState from '../EmptyState/EmptyState';
import styles from './TodoList.module.scss';

const TodoList: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);

  const filteredTodos = useMemo(() => filterTodos(todos, filter), [todos, filter]);
  const isEmpty = filteredTodos.length === 0;

  const todoItems = useMemo(() => {
    return filteredTodos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} />
    ));
  }, [filteredTodos]);

  return (
    <div className={styles.todoSection}>
      <List className={styles.list}>
        {isEmpty ? <EmptyState filter={filter} hasTodos={todos.length > 0} /> : todoItems}
      </List>
    </div>

  );
};

export default TodoList;
