import React, { useEffect, useState } from 'react';
import MemeForm from './components/MemeForm';
import MemeGallery from './components/MemeGallery';
import Leaderboard from './components/Leaderboard';
import io from 'socket.io-client';
import SocketContext from './context/SocketContext';

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function App() {
  const [memes, setMemes] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(backendURL);
    setSocket(newSocket);

    // Initial leaderboard fetch
    const fetchMemes = async () => {
      try {
        const res = await fetch(`${backendURL}/memes/leaderboard`);
        const data = await res.json();
        if (Array.isArray(data)) setMemes(data);
        else setMemes([]);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setMemes([]);
      }
    };

    fetchMemes();

    // 🔄 Handle new meme added from another client
    newSocket.on('newMeme', meme => {
      setMemes(prev => {
        const alreadyExists = prev.some(m => m.id === meme.id);
        if (alreadyExists) return prev;
        return [meme, ...prev];
      });
    });

    // 🔄 Handle upvote/downvote updates
    newSocket.on('voteUpdate', ({ id, increment }) => {
      setMemes(prev =>
        prev.map(m =>
          m.id === id ? { ...m, upvotes: m.upvotes + increment } : m
        )
      );
    });

    return () => newSocket.disconnect();
  }, []);

  if (!socket) return <div>Loading...</div>;

  return (
    <SocketContext.Provider value={socket}>
      <div className="bg-black text-cyberblue min-h-screen p-4">
        <h1 className="text-4xl text-neon font-bold mb-4">MemeHustle Marketplace</h1>
        <MemeForm />
        <Leaderboard memes={[...memes].sort((a, b) => b.upvotes - a.upvotes).slice(0, 5)} />
        <MemeGallery memes={memes} />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
