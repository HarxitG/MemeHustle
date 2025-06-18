import React, { useContext, useState } from 'react';
import axios from 'axios';
import SocketContext from '../context/SocketContext';

const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function MemeCard({ meme }) {
  const socket = useContext(SocketContext);
  const [caption, setCaption] = useState('');

  const vote = async (type) => {
    try {
      await axios.post(`${backendURL}/votes/${meme.id}`, { type });
    } catch (err) {
      console.error('❌ Vote failed:', err);
    }
  };

  const bid = async () => {
    const credits = prompt('Enter bid amount:');
    if (!credits) return;

    try {
      await axios.post(`${backendURL}/bids/${meme.id}`, { credits });
      alert('✅ Bid placed!');
    } catch (err) {
      console.error('❌ Bid failed:', err);
    }
  };

  const generateCaption = async () => {
    try {
      const res = await axios.post(`${backendURL}/memes/${meme.id}/caption`, {
        tags: meme.tags,
      });
      setCaption(res.data.caption);
    } catch (err) {
      console.error('❌ Caption generation failed:', err);
    }
  };

  return (
    <div className="border p-4 bg-black text-white shadow-md">
      <h2 className="text-xl font-bold text-neon">{meme.title}</h2>
      <img src={meme.image_url} alt="meme" className="w-full h-40 object-cover my-2" />
      <p className="text-sm">Tags: {meme.tags.join(', ')}</p>
      <p className="text-sm">Upvotes: {meme.upvotes}</p>
      <button onClick={() => vote('up')} className="mr-2 text-cyberblue">👍</button>
      <button onClick={() => vote('down')} className="mr-2 text-glitch">👎</button>
      <button onClick={bid} className="bg-cyberblue px-3 py-1 mt-2">Bid</button>
      <button onClick={generateCaption} className="mt-2 text-neon">⚡ Generate Caption</button>
      {caption && <p className="mt-2 text-glitch italic">{caption}</p>}
    </div>
  );
}

export default MemeCard;
