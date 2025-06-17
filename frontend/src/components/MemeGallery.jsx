import React from 'react';
import MemeCard from './MemeCard';

function MemeGallery({ memes }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {memes.map(meme => <MemeCard key={meme.id} meme={meme} />)}
    </div>
  );
}

export default MemeGallery;