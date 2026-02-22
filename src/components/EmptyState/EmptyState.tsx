import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import { FilterType } from '../../types/todo';
import styles from './EmptyState.module.scss';

interface EmptyStateProps {
  filter: FilterType;
  hasTodos: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ filter, hasTodos }) => {
  let message = "You don't have any TODOs yet. Add one to get started.";

  if (hasTodos && filter === 'active') {
    message = "You don't have any active TODOs.";
  } else if (hasTodos && filter === 'completed') {
    message = "You don't have any completed TODOs yet.";
  }

  return (
    <ListItem className={styles.emptyItem}>
      <ListItemText className={styles.listTxt}>{message}</ListItemText>
    </ListItem>
  );
};

export default EmptyState;
