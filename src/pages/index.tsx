import React, { useState, useRef, ReactNode } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';

const HorrorPage = () => {
  const prompt = `Generate a horror story`;
  // const prompt = `Hello`;
  const [story, setStory] = useState('');
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onToggle } = useDisclosure();

  const myRef = useRef<null | HTMLDivElement>(null);

  const scrollToHeader = () => {
    if (myRef.current !== null) {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const generateStory = async (e: any) => {
    e.preventDefault();
    onToggle();
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
    // setStory(
    //   "As they wandered through the mansion's labyrinthine corridors, the adventurers began to hear faint, chilling whispers that seemed to come from the very walls themselves. The whispers spoke of forgotten sorrows, ancient regrets, and a hunger for release. Goosebumps formed on their skin, and a growing sense of unease gnawed at their hearts. Despite their fear, the group pressed on, driven by a morbid curiosity. They discovered a hidden chamber, and in its center stood an ornate pedestal holding the unearthly relic—a small, obsidian figurine pulsating with an eerie light. Its unsettling aura seemed to warp reality around it. As they wandered through the mansion's labyrinthine corridors, the adventurers began to hear faint, chilling whispers that seemed to come from the very walls themselves. The whispers spoke of forgotten sorrows, ancient regrets, and a hunger for release. Goosebumps formed on their skin, and a growing sense of unease gnawed at their hearts. Despite their fear, the group pressed on, driven by a morbid curiosity. They discovered a hidden chamber, and in its center stood an ornate pedestal holding the unearthly relic—a small, obsidian figurine pulsating with an eerie light. Its unsettling aura seemed to warp reality around it.  As they wandered through the mansion's labyrinthine corridors, the adventurers began to hear faint, chilling whispers that seemed to come from the very walls themselves. The whispers spoke of forgotten sorrows, ancient regrets, and a hunger for release. Goosebumps formed on their skin, and a growing sense of unease gnawed at their hearts. Despite their fear, the group pressed on, driven by a morbid curiosity. They discovered a hidden chamber, and in its center stood an ornate pedestal holding the unearthly relic—a small, obsidian figurine pulsating with an eerie light. Its unsettling aura seemed to warp reality around it. As they wandered through the mansion's labyrinthine corridors, the adventurers began to hear faint, chilling whispers that seemed to come from the very walls themselves. The whispers spoke of forgotten sorrows, ancient regrets, and a hunger for release. Goosebumps formed on their skin, and a growing sense of unease gnawed at their hearts. Despite their fear, the group pressed on, driven by a morbid curiosity. They discovered a hidden chamber, and in its center stood an ornate pedestal holding the unearthly relic—a small, obsidian figurine pulsating with an eerie light. Its unsettling aura seemed to warp reality around it.  "
    // );
  };

  return (
    <div className="horror-page">
      <header className="horror-header">
        <h1>Welcome to your daily horror story</h1>
      </header>
      <main className="horror-content">
        <Image
          src="/header-image.jpg" // Replace with your horror-themed image URL
          alt="Horror Image"
          sizes="100vw"
          width={0}
          height={0}
          className="horror-image"
        />
        <Button variant={'ghost'} onClick={(e) => generateStory(e)}>
          Tell me a story
        </Button>
        <Collapse in={isOpen} animateOpacity className="horror-story-container">
          <Box
            p="40px"
            color="white"
            mt="4"
            bg="teal.800"
            rounded="md"
            shadow="md"
          >
            {isLoading && isOpen ? <Text fontSize="xl">Loading</Text> : story}
          </Box>
        </Collapse>
      </main>
      <footer className="horror-footer">
        <p>© {new Date().getFullYear()} Horror App. Powered by OpenAI.</p>
      </footer>
    </div>
  );
};

export default HorrorPage;
