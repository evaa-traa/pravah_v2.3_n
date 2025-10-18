import { registerWebComponents } from './register';
import { parseChatbot, injectChatbotInWindow } from './window';
import { ThemeProvider } from './context/ThemeContext';
import { ChatLayout } from './components/layout/ChatLayout';
import { customElement } from 'solid-element';
import { defaultBotProps } from './constants';
import { Bubble } from './features/bubble';
import { Full } from './features/full';

// Register web components first
registerWebComponents();

// Define a wrapper for the Full component to include ThemeProvider and ChatLayout
const FullWithLayout = (props: any, { element }: { element: HTMLElement }) => (
  <ThemeProvider>
    <ChatLayout>
      <Full {...props} element={element} />
    </ChatLayout>
  </ThemeProvider>
);

// Define a wrapper for the Bubble component to include ThemeProvider and ChatLayout
const BubbleWithLayout = (props: any) => (
  <ThemeProvider>
    <ChatLayout>
      <Bubble {...props} />
    </ChatLayout>
  </ThemeProvider>
);

// Re-register web components with the new wrappers
if (typeof window !== 'undefined') {
  // @ts-expect-error element incorect type
  customElement('flowise-fullchatbot', defaultBotProps, FullWithLayout);
  customElement('flowise-chatbot', defaultBotProps, BubbleWithLayout);
}

const chatbot = parseChatbot();

injectChatbotInWindow(chatbot);

export default chatbot;