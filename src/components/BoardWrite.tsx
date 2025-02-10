import { useState } from 'react'
import {cn} from "@/lib/utils"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent} from "@/components/ui/card";
import { v4 as uuidv4 } from 'uuid';

type Post = {
  id: string;
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
    if(!response.ok){
      throw new Error('Failed to save posts');
    }

    const result = await response.json();
    console.log(result);
  };

  const handlePost = () => {
    if(title && content) {
      const newPost: Post = {   
        id : uuidv4(),
        title,
        content,
      };
      saveToServer(newPost);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className={cn('container mx-auto p-8')}>
      <Card>
        <CardHeader>
          <h1 className={cn('text-2xl font-bold')}>게시판</h1>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder={'제목을 입력하세요'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder={'내용을 입력하세요'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={handlePost}>게시글 등록</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}