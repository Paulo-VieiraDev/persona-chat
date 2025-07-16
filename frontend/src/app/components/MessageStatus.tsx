import { CheckCheck } from 'lucide-react';
import { MessageStatus as StatusType } from '../page';

export const MessageStatus = ({ status }: { status?: StatusType }) => {
  if (!status) return null;

  const readColor = 'text-green-500';
  const sentColor = 'text-greebn-100/70';

  return (
    <div className="relative w-4 h-4 ml-1">
      <CheckCheck
        size={16}
        className={`absolute top-0 left-0 transition-colors duration-300 ${
          status === 'sent' ? sentColor : 'text-transparent'
        }`}
      />
      <CheckCheck
        size={16}
        className={`absolute top-0 left-0 transition-colors duration-300 ${
          status === 'read' ? readColor : 'text-transparent'
        }`}
      />
    </div>
  );
};