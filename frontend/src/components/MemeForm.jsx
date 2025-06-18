import React, { useState } from 'react';
import axios from 'axios';

const backendURL = process.env.REACT_APP_BACKEND_URL || 'https://memehustle-backend-nst7.onrender.com';

function MemeForm() {
  const [form, setForm] = useState({ title: '', image_url: '', tags: '' });
  const [caption, setCaption] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    try {
      const tagsArray = form.tags.split(',').map(tag => tag.trim());

      // Step 1: Create meme
      const memeRes = await axios.post(`${backendURL}/memes`, {
        title: form.title,
        image_url: form.image_url,
        tags: tagsArray,
      });

      const meme = memeRes.data;
      console.log('✅ Meme created:', meme);

      // Step 2: Generate caption
      const captionRes = await axios.post(`${backendURL}/memes/${meme.id}/caption`, {
        tags: tagsArray,
      });

      const generatedCaption = captionRes.data.caption;
      console.log('🧠 Generated caption:', generatedCaption);
      setCaption(generatedCaption);
    } catch (error) {
      console.error('❌ Error:', error);
      setCaption('Failed to generate caption.');
    }

    setForm({ title: '', image_url: '', tags: '' });
  };

  return (
    <div className="mb-6">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="bg-black border p-2 mr-2"
      />
      <input
        name="image_url"
        value={form.image_url}
        onChange={handleChange}
        placeholder="Image URL"
        className="bg-black border p-2 mr-2"
      />
      <input
        name="tags"
        value={form.tags}
        onChange={handleChange}
        placeholder="Tags (comma-separated)"
        className="bg-black border p-2 mr-2"
      />
      <button onClick={submit} className="bg-neon text-black px-4 py-2">
        Create Meme
      </button>

      {caption && (
        <div className="mt-4 text-green-400 font-mono">💬 Caption: {caption}</div>
      )}
    </div>
  );
}

export default MemeForm;
