import Categories from "../components/Home/Categories/Categories";
import Branding from "../components/Home/Branding/Branding";
import Hero from "../components/Home/Hero/Hero";
import BeastDeals from "../components/Home/BestDeals/BeastDeals";
import FeaturedProducts from "../components/Home/FeaturedProducts/FeaturedProducts";
import Events from "../components/Events/Events";
import Sponsored from "../components/Home/Sponsored/Sponsored";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Branding />
      <Categories />
      <BeastDeals />
      <Events />
      <FeaturedProducts />
      <Sponsored />
    </>
  );
}
