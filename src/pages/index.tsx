import React, { useState, useRef, useEffect } from 'react';
import { Box, Collapse, useDisclosure } from '@chakra-ui/react';

const HorrorPage = () => {
  // const prompt = `Generate a horror story`;
  const prompt = `Hello`;
  const [story, setStory] = useState('');
  const { isOpen, onToggle } = useDisclosure();

  const myRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const generateStory = async () => {
      onToggle();
      setStory('');
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
      // setStory(
      //   "As they wandered through the mansion's labyrinthine corridors, the adventurers began to hear faint, chilling whispers that seemed to come from the very walls themselves. The whispers spoke of forgotten sorrows, ancient regrets, and a hunger for release. Goosebumps formed on their skin, and a growing sense of unease gnawed at their hearts. Despite their fear, the group pressed on, driven by a morbid curiosity. They discovered a hidden chamber, and in its center stood an ornate pedestal holding the unearthly relic—a small, obsidian figurine pulsating with an eerie light. Its unsettling aura seemed to warp reality around it. As they wandered through the mansion's labyrinthine corridors, the adventurers began to hear faint, chilling whispers that seemed to come from the very walls themselves. The whispers spoke of forgotten sorrows, ancient regrets, and a hunger for release. Goosebumps formed on their skin, and a growing sense of unease gnawed at their hearts. Despite their fear, the group pressed on, driven by a morbid curiosity. They discovered a hidden chamber, and in its center stood an ornate pedestal holding the unearthly relic—a small, obsidian figurine pulsating with an eerie light. Its unsettling aura seemed to warp reality around it.  As they wandered through the mansion's labyrinthine corridors, the adventurers began to hear faint, chilling whispers that seemed to come from the very walls themselves. The whispers spoke of forgotten sorrows, ancient regrets, and a hunger for release. Goosebumps formed on their skin, and a growing sense of unease gnawed at their hearts. Despite their fear, the group pressed on, driven by a morbid curiosity. They discovered a hidden chamber, and in its center stood an ornate pedestal holding the unearthly relic—a small, obsidian figurine pulsating with an eerie light. Its unsettling aura seemed to warp reality around it. As they wandered through the mansion's labyrinthine corridors, the adventurers began to hear faint, chilling whispers that seemed to come from the very walls themselves. The whispers spoke of forgotten sorrows, ancient regrets, and a hunger for release. Goosebumps formed on their skin, and a growing sense of unease gnawed at their hearts. Despite their fear, the group pressed on, driven by a morbid curiosity. They discovered a hidden chamber, and in its center stood an ornate pedestal holding the unearthly relic—a small, obsidian figurine pulsating with an eerie light. Its unsettling aura seemed to warp reality around it.  "
      // );
    };

    generateStory();
  }, [prompt]);

  const scrollToHeader = () => {
    if (myRef.current !== null) {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="horror-page">
      <header className="horror-header">
        <h1>Welcome to your daily horror story</h1>
      </header>
      <main className="horror-content">
        <Box
          margin="0px"
          color="white"
          backgroundImage="/header-image.jpg"
          className="horror-box"
          rounded="md"
          shadow="md"
        >
          <Collapse
            in={isOpen}
            animateOpacity
            className="horror-story-container"
          >
            <Box
              p="40px"
              color="white"
              mt="4"
              mb="4"
              bgGradient="linear(to-t, green.500, rgba(35, 78, 82, .7))"
              rounded="md"
              shadow="md"
            >
              {story}
            </Box>
          </Collapse>
        </Box>
      </main>
      <footer className="horror-footer">
        <p>© {new Date().getFullYear()} Horror App. Powered by OpenAI.</p>
      </footer>
    </div>
  );
};

export default HorrorPage;
