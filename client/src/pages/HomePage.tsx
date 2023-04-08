import Categories from "../components/Categories/Categories";
import Branding from "../components/Branding/Branding";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import BeastDeals from "../components/BestDeals/BeastDeals";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Branding />
      <Categories />
      <BeastDeals />
    </>
  );
}
