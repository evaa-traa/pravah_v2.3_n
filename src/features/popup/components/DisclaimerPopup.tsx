import { Show, splitProps } from 'solid-js';
import { useTheme } from '../../../context/ThemeContext';

export type DisclaimerPopupProps = {
  isOpen?: boolean;
  isFullPage?: boolean; // New prop to indicate full-page mode
  onAccept?: () => void;
  onDeny?: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
  denyButtonText?: string;
  blurredBackgroundColor?: string;
  backgroundColor?: string;
  buttonColor?: string;
  textColor?: string;
  buttonTextColor?: string;
  denyButtonBgColor?: string;
};

export const DisclaimerPopup = (props: DisclaimerPopupProps) => {
  const [popupProps] = splitProps(props, [
    'onAccept',
    'onDeny',
    'isOpen',
    'isFullPage', // New prop
    'title',
    'message',
    'textColor',
    'buttonColor',
    'buttonText',
    'denyButtonText',
    'buttonTextColor',
    'denyButtonBgColor',
    'blurredBackgroundColor',
    'backgroundColor',
  ]);

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme();

  const handleAccept = () => {
    popupProps.onAccept?.();
  };

  const handleDeny = () => {
    popupProps.onDeny?.();
  };

  return (
    <Show when={popupProps.isOpen}>
      <div
        class="fixed inset-0 rounded-lg flex items-center justify-center backdrop-blur-sm z-50"
        style={{ background: popupProps.blurredBackgroundColor || 'rgba(0, 0, 0, 0.4)' }}
      >
        <div
          class="p-10 rounded-2xl shadow-lg max-w-md w-full text-center mx-4 font-sans transition-colors duration-300"
          style={{
            background: isDarkMode() === 'dark' ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
            color: isDarkMode() === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)',
          }}
        >
          <h2 class="text-2xl font-semibold mb-4 flex justify-center items-center">{popupProps.title ?? 'Disclaimer'}</h2>

          <p
            class="text-base mb-6"
            style={{ color: isDarkMode() === 'dark' ? 'var(--text-color-dark)' : 'var(--text-color-light)' }}
            innerHTML={
              popupProps.message ??
              'By using this chatbot, you agree to the <a target="_blank" href="https://flowiseai.com/terms">Terms & Condition</a>.'
            }
          />

          <div class="flex justify-center space-x-4">
            <button
              class="font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-colors duration-300"
              style={{ background: popupProps.buttonColor || '#3b82f6', color: popupProps.buttonTextColor || 'white' }}
              onClick={handleAccept}
            >
              {popupProps.buttonText ?? 'Start Chatting'}
            </button>

            {/* Only show the Cancel button if not in full-page mode */}
            <Show when={!popupProps.isFullPage}>
              <button
                class="font-bold py-2 px-6 rounded-xl focus:outline-none focus:shadow-outline transition-colors duration-300"
                style={{ background: popupProps.denyButtonBgColor || '#ef4444', color: popupProps.buttonTextColor || 'white' }}
                onClick={handleDeny}
              >
                {popupProps.denyButtonText ?? 'Cancel'}
              </button>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  );
};