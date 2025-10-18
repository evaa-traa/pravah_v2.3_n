/** @jsxImportSource solid-js */
import { parseChatbot, injectChatbotInWindow } from './window';
import { ThemeProvider } from './context/ThemeContext';
import { ChatLayout } from './components/layout/ChatLayout';
import { customElement, ICustomElement } from 'solid-element'; // Re-import ICustomElement
import { defaultBotProps } from './constants';
import { Bubble, BubbleProps } from './features/bubble';
import { Full, FullProps } from './features/full';
import { JSX } from 'solid-js';

// Define a wrapper for the Full component to include ThemeProvider and ChatLayout
const FullWithLayout = (props: FullProps, options: { element: ICustomElement }): JSX.Element => { // Use ICustomElement
  return (
    <ThemeProvider>
      <ChatLayout>
        <Full {...props} element={options.element as HTMLElement} /> {/* Cast to HTMLElement */}
      </ChatLayout>
    </ThemeProvider>
  );
};

// Define a wrapper for the Bubble component to include ThemeProvider and ChatLayout
const BubbleWithLayout = (props: BubbleProps, options: { element: ICustomElement }): JSX.Element => { // Use ICustomElement
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