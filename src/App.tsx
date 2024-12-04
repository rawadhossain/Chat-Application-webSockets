import { useChatStore } from './store/chatStore';
import { LandingPage } from './components/LandingPage';
import { ChatRoom } from './components/ChatRoom';

function App() {
    const currentRoom = useChatStore((state) => state.currentRoom);

    return (
        <div className="min-h-screen bg-black-900">
            {currentRoom ? <ChatRoom /> : <LandingPage />}
        </div>
    );
}

export default App;
