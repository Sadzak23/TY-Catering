import { FC } from "react";
import { HeroSection } from "@/sections/Hero";
import { AboutUs } from "@/sections/AboutUs";
// import { Portfolio } from "@/sections/Portfolio";
import { Calculator } from "@/sections/Calculator";
import { Contact } from "@/sections/Contact";

const Home: FC = () => (
  <>
    <HeroSection />
    <AboutUs />
    {/* <Portfolio /> */}
    <Calculator />
    <Contact />
  </>
);

export default Home;
