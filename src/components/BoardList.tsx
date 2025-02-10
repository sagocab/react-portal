import { useEffect, useState } from "react";
import {cn} from "@/lib/utils"

type Post = {
  id: string;
  title: string;
  content: string;
}

export function BoardList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/boards`);
      if(!response.ok){
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className={cn('container mx-auto p-8')}>
      <h1 className={cn('text-2xl font-bold mb-4')}>게시판</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className={cn('mb-4')}>
            <h2 className={cn('text-xl font-bold')}>{post.title}</h2>
            <p className={cn('text-gray-700')}>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}