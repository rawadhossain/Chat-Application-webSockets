export interface User {
    id: string;
    name: string;
    avatar?: string;
}

export interface Message {
    id: string;
    userId: string;
    content: string;
    timestamp: number;
}

export interface Room {
    id: string;
    name: string;
    users: User[];
    messages: Message[];
}
