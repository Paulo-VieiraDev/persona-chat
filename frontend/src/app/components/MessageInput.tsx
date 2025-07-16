import { useState, KeyboardEvent } from 'react';
import { SendHorizontal } from 'lucide-react';

interface Props {
  onSendMessage: (input: string) => void;
  isLoading: boolean;
}

export const MessageInput = ({ onSendMessage, isLoading }: Props) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isLoading) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const isButtonActive = input.trim() !== '' && !isLoading;

  return (
    <div className="flex items-center gap-3 w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Digite sua mensagem..."
        disabled={isLoading}
        className="flex-grow bg-slate-100 border border-slate-300 rounded-lg p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={!isButtonActive}
        aria-label="Enviar mensagem"
        className={`
          w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
          transition-all duration-200
          ${isButtonActive
            ? 'bg-blue-500 text-white cursor-pointer hover:bg-blue-600 active:scale-95'
            : 'bg-slate-300 text-slate-400 cursor-not-allowed'
          }
        `}
      >
        <SendHorizontal size={24} />
      </button>
    </div>
  );
};