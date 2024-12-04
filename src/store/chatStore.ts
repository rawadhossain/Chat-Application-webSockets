import { create } from 'zustand';
import { Message, Room, User } from '../types/chat';

interface ChatState {
    currentUser: User | null;
    currentRoom: Room | null;
    isTyping: { [key: string]: boolean };
    setCurrentUser: (user: User) => void;
    setCurrentRoom: (room: Room) => void;
    addMessage: (message: Message) => void;
    setUserTyping: (userId: string, isTyping: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    currentUser: null,
    currentRoom: null,
    isTyping: {},
    setCurrentUser: (user) => set({ currentUser: user }),
    setCurrentRoom: (room) => set({ currentRoom: room }),
    addMessage: (message) =>
        set((state) => ({
            currentRoom: state.currentRoom
                ? {
                      ...state.currentRoom,
                      messages: [...state.currentRoom.messages, message],
                  }
                : null,
        })),
    setUserTyping: (userId, isTyping) =>
        set((state) => ({
            isTyping: {
                ...state.isTyping,
                [userId]: isTyping,
            },
        })),
}));
