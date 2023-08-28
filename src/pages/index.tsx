import Footer from '../components/Footer';
import Header from '../components/Header';
import Story from '../components/Story';
import { generateStory } from '../lib/utils';

export type StoryProps = {
  story: string;
};

const HorrorPage = ({ story }: StoryProps) => {
  return (
    <div className="horror-page">
      <Header />
      <main className="horror-content">
        <Story story={story} />
      </main>
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  // const prompt = `Generate a horror story`;
  const prompt = `Hello`;
  // const story = await generateStory(prompt);  --> WORKS!
  const story = 'Random text to not charge by hitting api :)';

  return {
    props: {
      story,
    },
    revalidate: 86400, // Revalidate once per day
  };
}

export default HorrorPage;
