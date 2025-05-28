import { FC } from "react";
import { HeroSection } from "@/sections/Hero";
import { Calculator } from "@/sections/Calculator";
import { Portfolio } from "@/sections/Portfolio";

const Home: FC = () => (
  <>
    <HeroSection />
    <Calculator />
    <Portfolio />
  </>
);

export default Home;
