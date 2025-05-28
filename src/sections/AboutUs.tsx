import Image from "next/image";
import type { FC } from "react";
import img from "@/assets/img/aboutUs.jpg";

export const AboutUs: FC = () => (
  <section id="about">
    <Image aria-hidden src={img} alt="About us" width={500} />
    <article>
      <h2>About us</h2>
      <p>
        {`With over 15 years of experience, Truly Yours Catering brings expertise
        and care to every event we plan and execute. Whether you're envisioning
        an elegant affair, a lively celebration, or something entirely unique,
        simply share your vision—and then relax. Our dedicated administrative
        and event teams will handle every detail to ensure a seamless and
        memorable experience.`}
      </p>
    </article>
  </section>
);
