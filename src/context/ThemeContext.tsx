import { createContext, createSignal, useContext, Accessor, Setter, onMount, createEffect } from 'solid-js';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Accessor<Theme>;
  setTheme: Setter<Theme>;
  resolvedTheme: Accessor<'light' | 'dark'>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider(props: { children: any }) {
  const [theme, setTheme] = createSignal<Theme>(localStorage.getItem('theme') as Theme || 'system');
  const [resolvedTheme, setResolvedTheme] = createSignal<'light' | 'dark'>('light');

  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const updateResolvedTheme = (currentTheme: Theme) => {
    if (currentTheme === 'system') {
      setResolvedTheme(getSystemTheme());
    } else {
      setResolvedTheme(currentTheme);
    }
  };

  onMount(() => {
    updateResolvedTheme(theme());

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (theme() === 'system') {
        setResolvedTheme(e.matches ? 'dark' : 'light');
      }
    });
  });

  createEffect(() => {
    localStorage.setItem('theme', theme());
    updateResolvedTheme(theme());
    if (resolvedTheme() === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  };

  const value = {
    theme,
    setTheme,
    resolvedTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}