import React from 'react';
import { FilterType } from '../../types/todo';
import styles from './FilterButton.module.scss';

interface FilterButtonProps {
  filter: FilterType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <p className={isActive ? 'active' : ''} onClick={onClick}>
      {label}
    </p>
  );
};

export default FilterButton;
