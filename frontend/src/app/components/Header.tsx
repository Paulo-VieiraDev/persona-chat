import { Bot } from 'lucide-react';

export const Header = () => (
  <div className="flex w-full items-center justify-center gap-3">
    <Bot size={36} className="text-blue-500" />
    <h1 className="text-2xl font-bold text-slate-800 tracking-tighter">
      PersonaChat
    </h1>
  </div>
);