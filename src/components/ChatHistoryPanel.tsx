import { createSignal, For, Show, createEffect } from 'solid-js';
import { useTheme } from '../context/ThemeContext';
import { MenuIcon, SunIcon, MoonIcon, PlusIcon, EditIcon, TrashIcon, TickIcon, XIcon } from './icons';
import { getLocalStorageChatflow, setLocalStorageChatflow } from '../utils';
import { MessageType } from './Bot';

export type Conversation = {
  id: string;
  title: string;
  chatflowid: string;
  chatHistory: MessageType[];
  createdAt: string;
  updatedAt: string;
};

type ChatHistoryPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  currentConversationId: string;
  onSelectChat: (conversationId: string) => void;
  onNewChat: () => void;
  onEditChatTitle: (conversationId: string, newTitle: string) => void;
  onDeleteChat: (conversationId: string) => void;
  backgroundColor?: string;
  textColor?: string;
  titleBackgroundColor?: string;
  titleTextColor?: string;
};

const defaultBackgroundColor = '#ffffff';
const defaultTextColor = '#303235';
const defaultTitleBackgroundColor = '#3B81F6';
const defaultTitleTextColor = '#ffffff';

export const ChatHistoryPanel = (props: ChatHistoryPanelProps) => {
  const { theme, toggleTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme;

  const [editingId, setEditingId] = createSignal<string | null>(null);
  const [editTitle, setEditTitle] = createSignal('');

  const handleEditClick = (conversation: Conversation) => {
    setEditingId(conversation.id);
    setEditTitle(conversation.title);
  };

  const handleSaveEdit = (conversationId: string) => {
    if (editTitle().trim() !== '') {
      props.onEditChatTitle(conversationId, editTitle().trim());
      setEditingId(null);
      setEditTitle('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <Show when={props.isOpen}>
      <div
        class="absolute top-0 left-0 h-full w-full flex flex-col z-50 transition-transform duration-300 ease-in-out"
        style={{
          'background-color': props.backgroundColor ?? defaultBackgroundColor,
          color: props.textColor ?? defaultTextColor,
          'transform': props.isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Header */}
        <div
          class="flex items-center justify-between p-4 shadow-sm"
          style={{
            'background-color': props.titleBackgroundColor ?? defaultTitleBackgroundColor,
            color: props.titleTextColor ?? defaultTitleTextColor,
          }}
        >
          <h2 class="text-lg font-semibold">Chat History</h2>
          <button onClick={props.onClose} class="p-1 rounded-full hover:bg-white/20 transition-colors">
            <XIcon color={props.titleTextColor ?? defaultTitleTextColor} />
          </button>
        </div>

        {/* New Chat Button */}
        <div class="p-4 border-b" style={{ 'border-color': isDarkMode() === 'dark' ? 'var(--border-color-dark)' : 'var(--border-color-light)' }}>
          <button
            onClick={props.onNewChat}
            class="w-full flex items-center justify-center py-2 px-4 rounded-xl font-semibold transition-colors duration-300"
            style={{
              'background-color': props.titleBackgroundColor ?? defaultTitleBackgroundColor,
              color: props.titleTextColor ?? defaultTitleTextColor,
            }}
          >
            <PlusIcon class="mr-2" color={props.titleTextColor ?? defaultTitleTextColor} /> New Chat
          </button>
        </div>

        {/* Chat List */}
        <div class="flex-grow overflow-y-auto p-4">
          <For each={props.conversations}>
            {(conversation) => (
              <div
                class={`flex items-center justify-between p-3 mb-2 rounded-xl cursor-pointer transition-colors duration-200 ${
                  conversation.id === props.currentConversationId
                    ? 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => conversation.id !== editingId() && props.onSelectChat(conversation.id)}
                style={{
                  'background-color':
                    conversation.id === props.currentConversationId
                      ? (isDarkMode() === 'dark' ? 'var(--user-bubble-bg-dark)' : 'var(--user-bubble-bg-light)')
                      : 'transparent',
                  color:
                    conversation.id === props.currentConversationId
                      ? (isDarkMode() === 'dark' ? 'var(--user-bubble-text-dark)' : 'var(--user-bubble-text-light)')
                      : (isDarkMode() === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)'),
                }}
              >
                <Show
                  when={editingId() === conversation.id}
                  fallback={<span class="flex-grow truncate">{conversation.title}</span>}
                >
                  <input
                    type="text"
                    value={editTitle()}
                    onInput={(e) => setEditTitle(e.currentTarget.value)}
                    class="flex-grow p-1 rounded-md bg-transparent border focus:outline-none"
                    style={{
                      'border-color': isDarkMode() === 'dark' ? 'var(--border-color-dark)' : 'var(--border-color-light)',
                      color: isDarkMode() === 'dark' ? 'var(--input-text-dark)' : 'var(--input-text-light)',
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent selecting chat when editing
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveEdit(conversation.id);
                      if (e.key === 'Escape') handleCancelEdit();
                    }}
                  />
                </Show>

                <div class="flex items-center ml-2">
                  <Show
                    when={editingId() === conversation.id}
                    fallback={
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(conversation);
                          }}
                          class="p-1 rounded-full hover:bg-white/20 transition-colors"
                          title="Edit Chat"
                        >
                          <EditIcon color={conversation.id === props.currentConversationId ? (isDarkMode() === 'dark' ? 'var(--user-bubble-text-dark)' : 'var(--user-bubble-text-light)') : (isDarkMode() === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)')} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            props.onDeleteChat(conversation.id);
                          }}
                          class="p-1 rounded-full hover:bg-white/20 transition-colors ml-1"
                          title="Delete Chat"
                        >
                          <TrashIcon color={conversation.id === props.currentConversationId ? (isDarkMode() === 'dark' ? 'var(--user-bubble-text-dark)' : 'var(--user-bubble-text-light)') : (isDarkMode() === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)')} />
                        </button>
                      </>
                    }
                  >
                    <Show when={editingId() === conversation.id}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit(conversation.id);
                        }}
                        class="p-1 rounded-full hover:bg-white/20 transition-colors"
                        title="Save"
                      >
                        <TickIcon color={conversation.id === props.currentConversationId ? (isDarkMode() === 'dark' ? 'var(--user-bubble-text-dark)' : 'var(--user-bubble-text-light)') : (isDarkMode() === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)')} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEdit();
                        }}
                        class="p-1 rounded-full hover:bg-white/20 transition-colors ml-1"
                        title="Cancel"
                      >
                        <XIcon color={conversation.id === props.currentConversationId ? (isDarkMode() === 'dark' ? 'var(--user-bubble-text-dark)' : 'var(--user-bubble-text-light)') : (isDarkMode() === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)')} />
                      </button>
                    </Show>
                  </Show>
                </div>
              </div>
            )}
          </For>
        </div>

        {/* Theme Toggle */}
        <div class="p-4 border-t flex items-center justify-between" style={{ 'border-color': isDarkMode() === 'dark' ? 'var(--border-color-dark)' : 'var(--border-color-light)' }}>
          <span class="font-medium">Theme</span>
          <button onClick={toggleTheme} class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Show when={theme() === 'dark' || (theme() === 'system' && isDarkMode() === 'dark')} fallback={<SunIcon />}>
              <MoonIcon />
            </Show>
          </button>
        </div>
      </div>
    </Show>
  );
};