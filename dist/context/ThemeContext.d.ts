import { Accessor, Setter } from 'solid-js';
type Theme = 'light' | 'dark' | 'system';
interface ThemeContextType {
    theme: Accessor<Theme>;
    setTheme: Setter<Theme>;
    resolvedTheme: Accessor<'light' | 'dark'>;
    toggleTheme: () => void;
}
export declare function ThemeProvider(props: {
    children: any;
}): import("solid-js").JSX.Element;
export declare function useTheme(): ThemeContextType;
export {};
//# sourceMappingURL=ThemeContext.d.ts.map