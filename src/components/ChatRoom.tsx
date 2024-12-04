import { useState, useEffect, useRef } from 'react';
import { Send, Users } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useChatStore } from '../store/chatStore';
import { ChatMessage } from './ChatMessage';
import { Input } from './Input';
import { Button } from './Button';

export const ChatRoom = () => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const currentUser = useChatStore((state) => state.currentUser);
    const currentRoom = useChatStore((state) => state.currentRoom);
    const addMessage = useChatStore((state) => state.addMessage);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentRoom?.messages]);

    const handleSendMessage = () => {
        if (!message.trim() || !currentUser) return;

        const newMessage = {
            id: nanoid(),
            userId: currentUser.id,
            content: message,
            timestamp: Date.now(),
        };

        addMessage(newMessage);
        setMessage('');
    };

    if (!currentRoom) return null;

    return (
        <div className="min-h-screen bg-black-900 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl h-[800px] bg-black-800 rounded-xl shadow-xl flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 bg-black-700 rounded-t-xl border-b border-black-600">
                    <h2 className="text-xl font-semibold text-green-300">
                        {currentRoom.name}
                    </h2>
                    <div className="flex items-center space-x-2 text-green-400">
                        <Users size={20} />
                        <span>{currentRoom.users.length}</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {currentRoom.messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-6 bg-black-700 rounded-b-xl border-t border-black-600">
                    <div className="flex space-x-4">
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            onKeyPress={(e) =>
                                e.key === 'Enter' && handleSendMessage()
                            }
                        />
                        <Button onClick={handleSendMessage}>
                            <Send size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
