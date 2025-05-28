import { FC } from "react";
import { HeroSection } from "@/sections/Hero";
import { AboutUs } from "@/sections/AboutUs";
// import { Portfolio } from "@/sections/Portfolio";
import { Calculator } from "@/sections/Calculator";
import { Contact } from "@/sections/Contact";
import { CallToAction } from "@/sections/CTA";

const Home: FC = () => (
  <>
    <HeroSection />
    <AboutUs />
    {/* <Portfolio /> */}
    <CallToAction />
    <Calculator />
    <Contact />
  </>
);

export default Home;
