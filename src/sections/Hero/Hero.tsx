import Link from "next/link";
import styles from "./hero.module.scss";
import { FC } from "react";
import { Button } from "@/components/Button";

export const HeroSection: FC = () => {
  const services = [
    "GALA",
    "WEDDINGS",
    "SWEET SIXTEEN",
    "BAR OR BAT MITZVAH",
    "CORPORATE",
    "BABY SHOWER",
    "BIRTHDAY",
  ];
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>Truly Yours</h1>
          <h1>Catering</h1>
        </div>
        <Link href="#calculator">
          <Button label="Calculate your next event" />
        </Link>
        {/* <p style={{ fontSize: "20px", color: "#333", fontWeight: 800 }}>
          TEST <span style={{ fontSize: "1.25rem" }}>TEST</span>{" "}
        </p> */}
      </div>
      <div className={styles.banner}>
        <p>
          {services.map((e) => (
            <span key={e}>{e}</span>
          ))}
        </p>
      </div>
    </section>
  );
};
