/** @jsxImportSource solid-js */
import { parseChatbot, injectChatbotInWindow } from './window';
import { ThemeProvider } from './context/ThemeContext';
import { customElement } from 'solid-element';
import { defaultBotProps } from './constants';
import { Bubble, BubbleProps } from './features/bubble';
import { Full, FullProps } from './features/full';
import { JSX } from 'solid-js';

// Define a wrapper for the Full component to include ThemeProvider
const FullWithLayout = (props: FullProps, options: any): JSX.Element => {
  return (
    <ThemeProvider>
      <Full {...props} element={options.element as HTMLElement} />
    </ThemeProvider>
  );
};

// Define a wrapper for the Bubble component to include ThemeProvider
const BubbleWithLayout = (props: BubbleProps, options: any): JSX.Element => {
  return (
    <ThemeProvider>
      <Bubble {...props} />
    </ThemeProvider>
  );
};

// Re-register web components with the new wrappers
if (typeof window !== 'undefined') {
  customElement('flowise-fullchatbot', defaultBotProps, FullWithLayout);
  customElement('flowise-chatbot', defaultBotProps, BubbleWithLayout);
}

const chatbot = parseChatbot();

injectChatbotInWindow(chatbot);

export default chatbot;