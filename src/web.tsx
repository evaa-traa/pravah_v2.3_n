/** @jsxImportSource solid-js */
import { parseChatbot, injectChatbotInWindow } from './window';
import { ThemeProvider } from './context/ThemeContext';
import { ChatLayout } from './components/layout/ChatLayout';
import { customElement } from 'solid-element';
import { defaultBotProps } from './constants';
import { Bubble, BubbleProps } from './features/bubble';
import { Full, FullProps } from './features/full';
import { JSX } from 'solid-js';

// Define a wrapper for the Full component to include ThemeProvider and ChatLayout
const FullWithLayout = (props: FullProps, options: any): JSX.Element => { // Changed type to 'any'
  return (
    <ThemeProvider>
      <ChatLayout>
        <Full {...props} element={options.element as HTMLElement} /> {/* Cast element to HTMLElement */}
      </ChatLayout>
    </ThemeProvider>
  );
};

// Define a wrapper for the Bubble component to include ThemeProvider and ChatLayout
const BubbleWithLayout = (props: BubbleProps, options: any): JSX.Element => { // Changed type to 'any'
  return (
    <ThemeProvider>
      <ChatLayout>
        <Bubble {...props} />
      </ChatLayout>
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