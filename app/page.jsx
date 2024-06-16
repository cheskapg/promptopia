import Feed from '@components/Feed';
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient"> AI Powered Prompts!</span>
      </h1>
      <p className="desc text-center">
        Promptopia is a platform for discovering and sharing AI generated
        prompts.
        <br />
        Get inspired and create something amazing!
      </p>
    </section>
    // feed
  );
};

export default Home;
