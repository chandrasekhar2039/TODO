import React from 'react';
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

  const activeCount = getActiveCount();

  if (isMobile) {
    return (
      <div className={styles.navMob}>
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
            label="Completed"
            isActive={filter === 'completed'}
            onClick={() => setFilter('completed')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.nav}>
      <p>{activeCount} task left</p>
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
          label="Completed"
          isActive={filter === 'completed'}
          onClick={() => setFilter('completed')}
        />
      </div>
      <p className="cursor" onClick={clearCompleted}>
        clear completed
      </p>
    </div>
  );
};

export default FilterNav;
