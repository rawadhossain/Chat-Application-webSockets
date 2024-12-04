import { Message } from '../types/chat';
import { useChatStore } from '../store/chatStore';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const currentUser = useChatStore((state) => state.currentUser);
  const currentRoom = useChatStore((state) => state.currentRoom);
  const sender = currentRoom?.users.find((user) => user.id === message.userId);
  const isOwnMessage = currentUser?.id === message.userId;

  return (
    <div
      className={`flex ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwnMessage
            ? 'bg-green-600 text-white'
            : 'bg-black-600 text-gray-100'
        }`}
      >
        {!isOwnMessage && (
          <div className="text-sm font-medium text-green-300 mb-1">
            {sender?.name}
          </div>
        )}
        <p className="text-sm">{message.content}</p>
        <div className="text-xs text-green-200 opacity-75 mt-1">
          {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};