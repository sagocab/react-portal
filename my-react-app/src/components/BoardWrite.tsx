import React, { useState } from 'react';

interface Post {
  title: string;
  content: string;
}

export function BoardManage() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const saveToServer = async (newPost: Post) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) {
      throw new Error('Failed to save posts');
    }

    const result = await response.json();
    console.log(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPost: Post = { title, content };
    await saveToServer(newPost);
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Save Post</button>
    </form>
  );
}