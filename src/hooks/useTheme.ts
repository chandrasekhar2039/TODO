import { useEffect, useState } from 'react';
import { ThemeName, themes, getStoredTheme, setStoredTheme } from '../Styles/themes';

export const useTheme = () => {
  const [theme, setThemeState] = useState<ThemeName>(() => getStoredTheme());

  useEffect(() => {
    // Apply theme CSS variables to root element
    const themeVars = themes[theme];
    Object.entries(themeVars).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    
    // Save to localStorage
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark'
  };
};
