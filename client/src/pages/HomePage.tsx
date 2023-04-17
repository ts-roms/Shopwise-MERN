import Categories from "../components/Home/Categories/Categories";
import Branding from "../components/Home/Branding/Branding";
import Hero from "../components/Home/Hero/Hero";
import BeastDeals from "../components/Home/BestDeals/BeastDeals";
import FeaturedProducts from "../components/Home/FeaturedProducts/FeaturedProducts";
import Events from "../components/Events/Events";
import Sponsored from "../components/Home/Sponsored/Sponsored";
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
