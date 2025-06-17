import React from 'react';

function Leaderboard({ memes }) {
  return (
    <div className="my-6">
      <h2 className="text-2xl font-bold">🔥 Top Memes</h2>
      <ul>
        {memes.map((meme, i) => (
          <li key={meme.id}>{i + 1}. {meme.title} ({meme.upvotes} votes)</li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;