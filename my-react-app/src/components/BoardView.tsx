import React, { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

export function BoardView() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/boards`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts().catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>게시물 목록</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}