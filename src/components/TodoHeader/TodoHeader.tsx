import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './TodoHeader.module.scss';

const TodoHeader: React.FC = () => {
  return (
    <div className={styles.heading}>
      <h1>T O D O</h1>
      <ThemeToggle />
    </div>
  );
};

export default TodoHeader;
