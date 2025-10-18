import { createSignal, Show } from 'solid-js';
import { Sidebar } from './Sidebar';
import { MenuIcon } from '../icons';
import { useTheme } from '../../context/ThemeContext';

export const ChatLayout = (props: { children: any }) => {
  const [isSidebarOpen, setIsSidebarOpen] = createSignal(false);
  const { resolvedTheme } = useTheme();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen());
  };

  return (
    <div class={`flex h-screen overflow-hidden ${resolvedTheme() === 'dark' ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen()} toggleSidebar={toggleSidebar} />

      {/* Main Content Area */}
      <div class="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header */}
        <header class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm z-10">
          <button onClick={toggleSidebar} class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <MenuIcon />
          </button>
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white">RUVA AI</h1>
          {/* Placeholder for user profile/settings on the right */}
          <div class="w-6"></div> {/* To balance the menu icon on the left */}
        </header>

        {/* Chat Content */}
        <main class="flex-1 overflow-hidden flex justify-center py-4 px-2 sm:px-4">
          <div class="w-full max-w-3xl h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex flex-col overflow-hidden">
            {props.children}
          </div>
        </main>
      </div>

      {/* Overlay for when sidebar is open on mobile */}
      <Show when={isSidebarOpen()}>
        <div onClick={toggleSidebar} class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"></div>
      </Show>
    </div>
  );
};