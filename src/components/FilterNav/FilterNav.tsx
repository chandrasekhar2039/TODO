import React from 'react';
import { Hidden } from '@mui/material';
import { useTodoStore } from '../../store/todoStore';
import FilterButton from '../FilterButton/FilterButton';
import styles from './FilterNav.module.scss';

interface FilterNavProps {
  isMobile?: boolean;
}

const FilterNav: React.FC<FilterNavProps> = ({ isMobile = false }) => {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);
  const getActiveCount = useTodoStore((state) => state.getActiveCount);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);
  const todos = useTodoStore((state) => state.todos);

  const activeCount = getActiveCount();

  if (isMobile) {
    return (
      <div className={styles.navMob}>
        <Hidden mdUp>
          <div className={styles.navItemMob}>
            <FilterButton
              filter="all"
              label="All"
              isActive={filter === 'all'}
              onClick={() => setFilter('all')}
            />
            <FilterButton
              filter="active"
              label="Active"
              isActive={filter === 'active'}
              onClick={() => setFilter('active')}
            />
            <FilterButton
              filter="completed"
              label="completed"
              isActive={filter === 'completed'}
              onClick={() => setFilter('completed')}
            />
          </div>
        </Hidden>
      </div>
    );
  }

  return (
    <div className={styles.nav}>
      <p>{activeCount} task left</p>
      <Hidden smDown>
        <div className={styles.navItem}>
          <FilterButton
            filter="all"
            label="All"
            isActive={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterButton
            filter="active"
            label="Active"
            isActive={filter === 'active'}
            onClick={() => setFilter('active')}
          />
          <FilterButton
            filter="completed"
            label="completed"
            isActive={filter === 'completed'}
            onClick={() => setFilter('completed')}
          />
        </div>
      </Hidden>
      <p className="cursor" onClick={clearCompleted}>
        clear completed
      </p>
    </div>
  );
};

export default FilterNav;
