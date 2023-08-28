import React, { useEffect } from 'react';
import { Box, Collapse, useDisclosure } from '@chakra-ui/react';

import { StoryProps } from '../pages';

const Story = ({ story }: StoryProps) => {
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <Box
      margin="0px"
      color="white"
      backgroundImage="/header-image.jpg"
      className="horror-box"
      rounded="md"
      shadow="md"
    >
      <Collapse in={isOpen} animateOpacity className="horror-story-container">
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
  );
};

export default Story;
