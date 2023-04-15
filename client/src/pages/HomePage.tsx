import Categories from "../components/Categories/Categories";
import Branding from "../components/Branding/Branding";
import Hero from "../components/Hero/Hero";
import BeastDeals from "../components/BestDeals/BeastDeals";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import Events from "../components/Events/Events";
import Sponsored from "../components/Sponsored/Sponsored";
import { useEffect } from "react";

export default function HomePage() {
  // useEffect(() => {
  //   window.location.reload(true);
  // }, []);
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
