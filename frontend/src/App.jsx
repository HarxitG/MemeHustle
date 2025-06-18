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

    const fetchMemes = async () => {
      try {
        const res = await fetch(`${backendURL}/memes`); // ✅ Fetch all memes, not just leaderboard
        const data = await res.json();
        if (Array.isArray(data)) {
          setMemes(data.sort((a, b) => b.upvotes - a.upvotes));
        }
      } catch (err) {
        console.error("Error fetching memes:", err);
      }
    };

    fetchMemes();

    // ✅ Real-time: new meme
    newSocket.on('newMeme', meme => {
      setMemes(prev => {
        const exists = prev.some(m => m.id === meme.id);
        const updated = exists ? prev : [...prev, meme];
        return updated.sort((a, b) => b.upvotes - a.upvotes);
      });
    });

    // ✅ Real-time: upvote/downvote
    newSocket.on('voteUpdate', ({ id, increment }) => {
      setMemes(prev => {
        const updated = prev.map(m =>
          m.id === id ? { ...m, upvotes: m.upvotes + increment } : m
        );
        return updated.sort((a, b) => b.upvotes - a.upvotes);
      });
    });

    return () => newSocket.disconnect();
  }, []);

  if (!socket) return <div>Loading...</div>;

  return (
    <SocketContext.Provider value={socket}>
      <div className="bg-black text-cyberblue min-h-screen p-4">
        <h1 className="text-4xl text-neon font-bold mb-4">MemeHustle Marketplace</h1>
        <MemeForm />
        <Leaderboard memes={memes.slice(0, 5)} />
        <MemeGallery memes={memes} />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
