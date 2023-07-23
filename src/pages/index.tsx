import React, { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import Image from 'next/image';

const HorrorPage = () => {
  const prompt = `Generate a horror story`;
  const [story, setStory] = useState('');
  const [isLoading, setLoading] = useState(false);

  const generateStory = async (e: any) => {
    e.preventDefault();
    setStory('');
    setLoading(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }
    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setStory((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <div className="horror-page">
      <header className="horror-header">
        <h1>Welcome to your daily horror story</h1>
      </header>
      <main className="horror-content">
        <Image
          src="/header-image.jpg" // Replace with your horror-themed image URL
          alt="Horror"
          sizes="100vw"
          width={0}
          height={0}
          style={{ width: '100%', height: 'auto' }} // optional
          className="horror-image"
        />
        <Button variant={'ghost'} onClick={(e) => generateStory(e)}>
          Tell me a story
        </Button>
        <p>This is some creepy text. Lorem ipsum dolor sit amet...</p>
      </main>
      <footer className="horror-footer">
        <p>© {new Date().getFullYear()} Horror App. Powered by ChatGPT.</p>
      </footer>
    </div>
  );
};

export default HorrorPage;
