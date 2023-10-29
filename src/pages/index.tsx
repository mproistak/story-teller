import { useAuthState } from 'react-firebase-hooks/auth';
import { generateStory } from '@utils/helpers';
import { Box, Spinner } from '@chakra-ui/react';
import { Footer, Header, Story, Submarine } from '@components';
import ChatBox from '@components/chat/Chatbox';
import { auth } from '../../firebase';

export type StoryProps = {
  story: string;
};

const HorrorPage = ({ story }: StoryProps) => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="horror-page">
      <Header />
      <main className="horror-content">
        {loading ? (
          <Box
            margin="0px"
            color="white"
            backgroundImage="/header-image-halloween.jpg"
            className="horror-box"
            rounded="md"
          >
            <div className="spinner">
              <Spinner size={'xl'} />
            </div>
          </Box>
        ) : user ? (
          <ChatBox />
        ) : (
          <Story story={story} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  const prompt = `Generate a horror story`;
  // const prompt = `Hello`;
  const story = await generateStory(prompt);
  // const story = 'Random text to not charge by hitting api :)';

  return {
    props: {
      story,
    },
    revalidate: 86400, // Revalidate once per day
    // revalidate: 60, // Revalidate every one minute
  };
}

export default HorrorPage;
