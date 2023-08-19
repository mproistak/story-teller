import React, { useState, useRef } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import Image from 'next/image';

const HorrorPage = () => {
  const prompt = `Generate a horror story`;
  const [story, setStory] = useState('');
  const [isLoading, setLoading] = useState(false);

  const myRef = useRef<null | HTMLDivElement>(null);

  const scrollToHeader = () => {
    if (myRef.current !== null) {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    console.log('Edge function returned.');

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    setTimeout(() => {
      scrollToHeader();
    }, 500);

    // This data is a ReadableStream
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
    scrollToHeader();
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
        {isLoading ? <p>Loading...</p> : <p>{story}</p>}
      </main>
      <footer className="horror-footer">
        <p>© {new Date().getFullYear()} Horror App. Powered by OpenAI.</p>
      </footer>
    </div>
  );
};

export default HorrorPage;
