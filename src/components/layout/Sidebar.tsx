import { createSignal, Show, For } from 'solid-js';
import { useTheme } from '../../context/ThemeContext';
import { PlusIcon, SunIcon, MoonIcon, MenuIcon, EditIcon, TrashIcon } from '../icons';

export const Sidebar = (props: { isOpen: boolean; toggleSidebar: () => void }) => {
  const { theme, toggleTheme, resolvedTheme } = useTheme();
  const [conversations, setConversations] = createSignal([
    { id: '1', title: 'New Chat 1' },
    { id: '2', title: 'Flowise AI' },
    { id: '3', title: 'SolidJS Help' },
  ]);
  const [editingId, setEditingId] = createSignal<string | null>(null);
  const [editTitle, setEditTitle] = createSignal('');

  const handleNewChat = () => {
    const newId = String(conversations().length + 1);
    setConversations([{ id: newId, title: `New Chat ${newId}` }, ...conversations()]);
  };

  const startEditing = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const saveEdit = (id: string) => {
    setConversations(
      conversations().map((conv) => (conv.id === id ? { ...conv, title: editTitle() } : conv)),
    );
    setEditingId(null);
    setEditTitle('');
  };

  const deleteConversation = (id: string) => {
    setConversations(conversations().filter((conv) => conv.id !== id));
  };

  return (
    <div
      class={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${props.isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}
    >
      <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Conversations</h2>
        <button onClick={props.toggleSidebar} class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
          <MenuIcon />
        </button>
      </div>

      <div class="p-4">
        <button
          onClick={handleNewChat}
          class="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          <PlusIcon class="mr-2" /> New Chat
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-2">
        <For each={conversations()}>
          {(conv) => (
            <div class="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 group">
              {editingId() === conv.id ? (
                <input
                  type="text"
                  value={editTitle()}
                  onInput={(e) => setEditTitle(e.target.value)}
                  onBlur={() => saveEdit(conv.id)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit(conv.id)}
                  class="flex-1 bg-transparent border-b border-blue-500 focus:outline-none dark:text-white"
                />
              ) : (
                <span class="text-gray-800 dark:text-gray-200 flex-1 truncate">{conv.title}</span>
              )}
              <div class="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button onClick={() => startEditing(conv.id, conv.title)} class="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400">
                  <EditIcon class="w-4 h-4" />
                </button>
                <button onClick={() => deleteConversation(conv.id)} class="text-gray-500 hover:text-red-600 dark:hover:text-red-400">
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </For>
      </div>

      <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <button
          onClick={toggleTheme}
          class="flex items-center px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <Show when={resolvedTheme() === 'light'} fallback={<MoonIcon class="mr-2" />}>
            <SunIcon class="mr-2" />
          </Show>
          {resolvedTheme() === 'light' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <div class="text-gray-600 dark:text-gray-400">
          {/* Placeholder for user account/settings */}
          User Account
        </div>
      </div>
    </div>
  );
};