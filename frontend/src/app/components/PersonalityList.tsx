import { Message, Personality, ChatHistories } from '../page';

export interface PersonalityDetails {
  id: string;
  name: string;
  emoji: string;
}

interface Props {
  personalities: PersonalityDetails[]; 
  selected: Personality;
  onSelect: (p: Personality) => void;
  disabled: boolean;
  histories: ChatHistories;
}

export const PersonalityList = ({ personalities, selected, onSelect, disabled, histories }: Props) => {
  return (
    <div>
      {personalities.map((p) => {
        const currentHistory = histories[p.id as Personality] || [];
        const lastMessage = currentHistory.length > 0 ? currentHistory[currentHistory.length - 1] : null;

        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id as Personality)}
            disabled={disabled}
            className={`w-full flex items-center gap-4 p-4 text-left transition-colors border-b border-slate-200
              ${selected === p.id ? 'md:bg-slate-100' : ''}
              hover:bg-slate-100 disabled:opacity-50
            `}
          >
            <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
              <span className="text-3xl">{p.emoji}</span>
            </div>
            <div className="flex-grow w-full overflow-hidden">
              <p className="font-semibold text-slate-800">{p.name}</p>
              <p className="text-sm text-slate-500 truncate">
                {lastMessage
                  ? `${lastMessage.role === 'user' ? 'Você: ' : ''}${lastMessage.parts[0].text}`
                  : 'Nenhuma mensagem ainda'
                }
              </p>
            </div>
            <div className="text-xs text-slate-400 self-start flex-shrink-0">
              {lastMessage && new Date(lastMessage.id).toLocaleTimeString('pt-BR', {
                hour: '2-digit', minute: '2-digit'
              })}
            </div>
          </button>
        );
      })}
    </div>
  );
};