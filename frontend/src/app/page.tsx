'use client';

import { useState, useEffect } from 'react';
// Atenção na importação: pegamos os tipos de dentro do PersonalityList
import { PersonalityList, PersonalityDetails } from './components/PersonalityList';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { Header } from './components/Header';
import { ArrowLeft} from 'lucide-react';

// Tipos
export type MessageStatus = 'sent' | 'read';
export type Message = { id: number; role: 'user' | 'model'; parts: { text: string }[]; status?: MessageStatus; };
export type Personality = 'juninho' | 'penelope' | 'kelvin' | 'tiabeth' | 'tioroberto' | 'cleitinho';
export type ChatHistories = Record<Personality, Message[]>;

// Array de personalidades agora vive aqui, como fonte única de dados
const personalities: PersonalityDetails[] = [
  { id: 'juninho', name: 'Juninho Bro', emoji: '🤪' },
  { id: 'penelope', name: 'Penélope Charmosa', emoji: '🥰' },
  { id: 'kelvin', name: 'Kelvin', emoji: '🤓' },
  { id: 'tiabeth', name: 'Tia Beth', emoji: '😇' },
  { id: 'tioroberto', name: 'Tio Roberto', emoji: '😎' },
  { id: 'cleitinho', name: 'Cleitinho (Irmão)', emoji: '🤮' },
];

const initialHistories: ChatHistories = {
  juninho: [],
  penelope: [],
  kelvin: [],
  tiabeth: [],
  tioroberto: [],
  cleitinho: [],
};

export default function HomePage() {
  const [activeView, setActiveView] = useState<'list' | 'chat'>('list');
  const [chatHistories, setChatHistories] = useState<ChatHistories>(initialHistories);
  const [selectedPersonality, setSelectedPersonality] = useState<Personality>('juninho');
  const [isLoading, setIsLoading] = useState(false);

  // Lógica para encontrar os detalhes da personalidade selecionada
  const currentPersonalityDetails = personalities.find(p => p.id === selectedPersonality);
  
  // ... (useEffects e handleSendMessage continuam iguais ao que você já tem)
  useEffect(() => {
    try {
      const savedHistories = localStorage.getItem('chat-histories');
      if (savedHistories) {
        setChatHistories(JSON.parse(savedHistories));
      }
    } catch (error) {
      console.error("Falha ao carregar histórico:", error);
      setChatHistories(initialHistories);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chat-histories', JSON.stringify(chatHistories));
  }, [chatHistories]);

  const handleSelectPersonality = (personality: Personality) => {
    setSelectedPersonality(personality);
    setActiveView('chat');
  };

  const handleSendMessage = async (inputText: string) => {
    if (!inputText.trim() || isLoading) return;
    const userMessage: Message = { id: Date.now(), role: 'user', parts: [{ text: inputText }], status: 'sent', };
    const updatedHistory = [...(chatHistories[selectedPersonality] || []), userMessage];
    setChatHistories((prev) => ({ ...prev, [selectedPersonality]: updatedHistory }));
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ personalidade: selectedPersonality, historico: updatedHistory.map(({ id, status, ...msg }) => msg), }), });
      if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
      const data = await response.json();
      const modelMessage: Message = { id: Date.now() + 1, role: 'model', parts: [{ text: data.resposta }], };
      setChatHistories((prev) => {
        const historyForUpdate = [...prev[selectedPersonality]];
        const lastUserMessageIndex = historyForUpdate.findIndex(msg => msg.id === userMessage.id);
        if (lastUserMessageIndex !== -1) { historyForUpdate[lastUserMessageIndex].status = 'read'; }
        return { ...prev, [selectedPersonality]: [...historyForUpdate, modelMessage], };
      });
    } catch (error) {
      console.error("Falha ao comunicar com o backend:", error);
      const errorMessage: Message = { id: Date.now() + 1, role: 'model', parts: [{ text: "Oops! Não consegui me conectar. Verifique se o servidor está rodando." }], };
      setChatHistories((prev) => ({ ...prev, [selectedPersonality]: [...updatedHistory, errorMessage], }));
    } finally {
      setIsLoading(false);
    }
  };

  const currentMessages = chatHistories[selectedPersonality] || [];

  return (
    <div className="h-screen bg-slate-100 text-slate-800 font-sans md:flex">
      <aside className={`w-full md:w-full md:max-w-xs flex flex-col border-r border-slate-200 bg-white h-screen ${activeView === 'list' ? 'flex' : 'hidden'} md:flex`}>
        <header className="p-4 h-[70px] flex-shrink-0 flex items-center border-b border-slate-200">
          <Header />
        </header>
        <div className="flex-grow overflow-y-auto">
          <PersonalityList
            personalities={personalities}
            selected={selectedPersonality}
            onSelect={handleSelectPersonality}
            disabled={isLoading}
            histories={chatHistories}
          />
        </div>
        <footer className="p-4 text-center border-t border-slate-200 flex-shrink-0 h-[70px] flex flex-col items-center justify-center">
          <p className="font-bold text-sm text-slate-600">PersonaChat</p>
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1 mt-1">
            Feito por Paulo Vieira © 2025
          </p>
        </footer>
      </aside>

      <main className={`flex-1 flex-col h-screen ${activeView === 'chat' ? 'flex' : 'hidden'} md:flex`}>
        <header className="p-4 h-[70px] flex-shrink-0 flex items-center gap-3 bg-white border-b border-slate-200">
          <button onClick={() => setActiveView('list')} className="md:hidden p-2 rounded-full hover:bg-slate-100">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="w-11 h-11 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">{currentPersonalityDetails?.emoji}</span>
          </div>
          <div className="flex-grow overflow-hidden">
            <h2 className="text-lg font-semibold text-slate-900 truncate">
              {currentPersonalityDetails?.name}
            </h2>
            <p className="text-sm text-slate-500">online</p>
          </div>
        </header>

        <div className="flex-grow p-4 md:p-6 overflow-y-scroll chat-window bg-slate-50">
          <ChatWindow messages={currentMessages} isLoading={isLoading} />
        </div>
        <footer className="p-4 bg-white border-t border-slate-200 flex-shrink-0 h-[70px] flex items-center">
          <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </footer>
      </main>
    </div>
  );
}