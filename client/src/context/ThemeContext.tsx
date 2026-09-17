import React, { createContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // 1. Check localStorage if user explicitly selected a preference
    const userSelected = localStorage.getItem('equipe-forma-theme-user-selected');
    const saved = localStorage.getItem('equipe-forma-theme') as Theme | null;
    if (userSelected && (saved === 'light' || saved === 'dark')) {
      return saved;
    }
    // 2. Default to dark mode
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('equipe-forma-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    localStorage.setItem('equipe-forma-theme-user-selected', 'true');
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    localStorage.setItem('equipe-forma-theme-user-selected', 'true');
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


