import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.scss';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <span onClick={toggleTheme}>
      {isDark ? (
        <WbSunnyIcon className={styles.themeSun} />
      ) : (
        <NightsStayIcon className={styles.themeMoon} />
      )}
    </span>
  );
};

export default ThemeToggle;
