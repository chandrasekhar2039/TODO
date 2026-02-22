import React from 'react';
import { Grid2 } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import BackgroundImage from './BackgroundImage/BackgroundImage';
import TodoHeader from './TodoHeader/TodoHeader';
import TodoInput from './TodoInput/TodoInput';
import TodoList from './TodoList/TodoList';
import FilterNav from './FilterNav/FilterNav';
import { useTodoStore } from '../store/todoStore';
import styles from './main.module.scss';

const Main: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <>
      <BackgroundImage />
      <div className={styles.toplayer}>
        <Grid2 container direction="column" alignContent="center" spacing={1}>
          <div className={styles.container}>
            <TodoHeader />
          </div>

          <div className={styles.container}>
            <TodoInput />
          </div>

          <div className={styles.container}>
            <TodoList />
            {todos.length > 0 && !isMobile && <FilterNav />}
          </div>

          {todos.length > 0 && isMobile && (
            <div className={styles.container}>
              <FilterNav isMobile />
            </div>
          )}

          <div className={styles.footer}>
            <p>
              Made by{' '}
              <a
                href="https://www.instagram.com/developer_dev/?hl=en"
                target="_blank"
                rel="noreferrer"
              >
                Chandrasekhar
              </a>
            </p>
          </div>
        </Grid2>
      </div>
    </>
  );
};

export default Main;
