import { FC } from "react";
import { HeroSection } from "@/sections/Hero";
import { Calculator } from "@/sections/Calculator";
import { Portfolio } from "@/sections/Portfolio";
import { Contact } from "@/sections/Contact";

const Home: FC = () => (
  <>
    <HeroSection />
    <Calculator />
    <Portfolio />
    <Contact />
  </>
);

export default Home;
