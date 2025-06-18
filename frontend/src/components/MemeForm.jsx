import React, { useState } from 'react';
import axios from 'axios';

function MemeForm() {
  const [form, setForm] = useState({ title: '', image_url: '', tags: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    const tagsArray = form.tags.split(',').map(tag => tag.trim());
    await axios.post('http://localhost:5000/memes', { ...form, tags: tagsArray });
    setForm({ title: '', image_url: '', tags: '' });
  };

  return (
    <div className="mb-6">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="bg-black border p-2 mr-2" />
      <input name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" className="bg-black border p-2 mr-2" />
      <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className="bg-black border p-2 mr-2" />
      <button onClick={submit} className="bg-neon text-black px-4 py-2">Create Meme</button>
    </div>
  );
}

export default MemeForm;
