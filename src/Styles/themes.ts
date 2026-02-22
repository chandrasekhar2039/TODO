export type ThemeName = 'dark' | 'light';

export interface Theme {
  '--bg-color': string;
  '--bg-card': string;
  '--link-color': string;
  '--txt-color': string;
  '--txt-color-sec': string;
  '--opacity': string;
  '--footer'?: string;
}

export const themes: Record<ThemeName, Theme> = {
  dark: {
    '--bg-color': '#161620',
    '--bg-card': '#25273c',
    '--link-color': '#447be8',
    '--txt-color': '#bbbdd5',
    '--txt-color-sec': '#fffefe',
    '--opacity': '0.6',
    '--footer': '#4b4b5d'
  },
  light: {
    '--bg-color': '#FFFFFF',
    '--bg-card': '#FFFFFF',
    '--link-color': '#3E00FF',
    '--txt-color': '#100303',
    '--txt-color-sec': '#000000',
    '--opacity': '1'
  }
};

const THEME_STORAGE_KEY = 'theme-preference';

export const getStoredTheme = (): ThemeName => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch (error) {
    console.error('Error reading theme from localStorage:', error);
  }
  return 'dark'; // default
};

export const setStoredTheme = (theme: ThemeName): void => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};
