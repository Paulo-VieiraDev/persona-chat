import { useEffect, useRef } from 'react';
import { Message } from '../page';
import { Bot } from 'lucide-react';
import { MessageStatus } from './MessageStatus';

export const ChatWindow = ({ messages, isLoading }: { messages: Message[], isLoading: boolean }) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="space-y-2">
      {messages.map((msg) => {
        const timestamp = new Date(msg.id).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        });

        return (
          <div
            key={msg.id}
            className={`flex items-end gap-2 md:gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl shadow-sm flex flex-col max-w-[85%] md:max-w-xl ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-slate-200 text-slate-800 rounded-bl-none'
              }`}
            >
              <p className="whitespace-pre-wrap mr-10">{msg.parts[0].text}</p>
              <div className="flex self-end items-center mt-1">
                <span className={`text-xs mr-1 ${msg.role === 'user' ? 'text-blue-100/70' : 'text-slate-400'}`}>
                  {timestamp}
                </span>
                {msg.role === 'user' && <MessageStatus status={msg.status} />}
              </div>
            </div>
          </div>
        );
      })}

      {isLoading && (
        <div className="flex items-end gap-3 justify-start">
          <div className="bg-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
            <div className="flex items-center space-x-2 text-slate-500">
              <Bot size={20} className="animate-pulse" />
              <span className="text-sm">Digitando...</span>
            </div>
          </div>
        </div>
      )}

      <div ref={chatEndRef} />
    </div>
  );
};