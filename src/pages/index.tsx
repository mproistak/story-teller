import Footer from '../components/Footer';
import Header from '../components/Header';
import Story from '../components/Story';

const HorrorPage = () => {
  return (
    <div className="horror-page">
      <Header />
      <main className="horror-content">
        <Story />
      </main>
      <Footer />
    </div>
  );
};

export default HorrorPage;
