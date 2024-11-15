import Accordion from "../components/home/Accordion";
import Banner from "../components/home/Banner";
import FeaturedProducts from "../components/home/FeaturedProducts";
import UserReview from "../components/home/UserReview";


const Home = () => {
  return (
    <main>
      <Banner />
      <div className="container mx-auto">
        <section className="my-24">
          <h1 className="text-2xl font-semibold mb-16 text-center">
            Featured Products
          </h1>
          <FeaturedProducts />
        </section>
        <section className="my-24">
          <h1 className="text-2xl font-semibold mb-16 text-center">
            User Review
          </h1>
          <UserReview />
        </section>
        <section className="my-24">
          <h1 className="text-2xl font-semibold mb-16 text-center">
            Frequently asked question
          </h1>
          <Accordion />
        </section>
      </div>
    </main>
  );
};

export default Home;
