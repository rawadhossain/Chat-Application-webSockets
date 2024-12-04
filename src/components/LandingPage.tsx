import { useState } from 'react';
import { MessageSquarePlus, LogIn } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useChatStore } from '../store/chatStore';
import { Button } from './Button';
import { Input } from './Input';

export const LandingPage = () => {
    const [username, setUsername] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [view, setView] = useState<'join' | 'create'>('join');
    const [roomName, setRoomName] = useState('');
    const setCurrentUser = useChatStore((state) => state.setCurrentUser);
    const setCurrentRoom = useChatStore((state) => state.setCurrentRoom);

    const handleCreateRoom = () => {
        if (!username || !roomName) return;

        const user = { id: nanoid(), name: username };
        const room = {
            id: nanoid(6),
            name: roomName,
            users: [user],
            messages: [],
        };

        setCurrentUser(user);
        setCurrentRoom(room);
    };

    const handleJoinRoom = () => {
        if (!username || !roomCode) return;

        const user = { id: nanoid(), name: username };
        const room = {
            id: roomCode,
            name: 'Test Room',
            users: [user],
            messages: [],
        };

        setCurrentUser(user);
        setCurrentRoom(room);
    };

    return (
        <div className="min-h-screen bg-black-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-black-800 p-8 rounded-xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-green-400">
                        Real-Time Chat App
                    </h2>
                    <p className="mt-2 text-green-200">Connect to chat...</p>
                </div>

                <div className="flex space-x-4">
                    <Button
                        variant={view === 'join' ? 'primary' : 'secondary'}
                        onClick={() => setView('join')}
                        className="flex-1"
                    >
                        <LogIn className="inline-block mr-2" size={20} />
                        Join Room
                    </Button>
                    <Button
                        variant={view === 'create' ? 'primary' : 'secondary'}
                        onClick={() => setView('create')}
                        className="flex-1"
                    >
                        <MessageSquarePlus
                            className="inline-block mr-2"
                            size={20}
                        />
                        Create Room
                    </Button>
                </div>

                <div className="space-y-4">
                    <Input
                        placeholder="Your display name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    {view === 'join' ? (
                        <>
                            <Input
                                placeholder="Room code"
                                value={roomCode}
                                onChange={(e) => setRoomCode(e.target.value)}
                            />
                            <Button
                                className="w-full"
                                onClick={handleJoinRoom}
                                disabled={!username || !roomCode}
                            >
                                Join Room
                            </Button>
                        </>
                    ) : (
                        <>
                            <Input
                                placeholder="Room name"
                                value={roomName}
                                onChange={(e) => setRoomName(e.target.value)}
                            />
                            <Button
                                className="w-full"
                                onClick={handleCreateRoom}
                                disabled={!username || !roomName}
                            >
                                Create Room
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
