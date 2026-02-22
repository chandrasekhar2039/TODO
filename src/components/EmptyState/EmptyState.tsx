import React from 'react';
import { ListItem, ListItemText } from '@mui/material';
import styles from './EmptyState.module.scss';

const EmptyState: React.FC = () => {
  return (
    <ListItem>
      <ListItemText className={styles.listTxt}>No Task available</ListItemText>
    </ListItem>
  );
};

export default EmptyState;
