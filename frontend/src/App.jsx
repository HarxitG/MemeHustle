import React, { useEffect, useState } from 'react';
import MemeForm from './components/MemeForm';
import MemeGallery from './components/MemeGallery';
import Leaderboard from './components/Leaderboard';
import io from 'socket.io-client';
import SocketContext from './context/SocketContext';

function App() {
  const [memes, setMemes] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    fetch('http://localhost:5000/memes/leaderboard')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setMemes(data);
        } else {
          console.warn("⚠️ Invalid leaderboard response: ", data);
          setMemes([]);
        }
      })
      .catch(err => {
        console.error("Error fetching leaderboard:", err);
        setMemes([]);
      });

    newSocket.on('newMeme', meme => setMemes(prev => [meme, ...prev]));
    newSocket.on('voteUpdate', ({ id, increment }) => {
      setMemes(prev => prev.map(m => m.id === id ? { ...m, upvotes: m.upvotes + increment } : m));
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  if (!socket) return <div>Loading...</div>;

  return (
    <SocketContext.Provider value={socket}>
      <div className="bg-black text-cyberblue min-h-screen p-4">
        <h1 className="text-4xl text-neon font-bold mb-4">💀 MemeHustle Marketplace</h1>
        <MemeForm />
        <Leaderboard memes={Array.isArray(memes) ? memes.slice(0, 5) : []} />
        <MemeGallery memes={memes} />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
