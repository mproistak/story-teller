import { Footer, Header, Story, Submarine } from '@/src/components';
import { generateStory } from '@/src/lib/utils';

export type StoryProps = {
  story: string;
};

const HorrorPage = ({ story }: StoryProps) => {
  return (
    <div className="horror-page">
      <Header />
      <main className="horror-content">
        <Story story={story} />
        <Submarine />
      </main>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  // const prompt = `Generate a horror story`;
  const prompt = `Hello`;
  // const story = await generateStory(prompt);
  const story = 'Random text to not charge by hitting api :)';

  return {
    props: {
      story,
    },
    revalidate: 86400, // Revalidate once per day
  };
}

export default HorrorPage;
