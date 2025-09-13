import Image from "next/image";
import type { FC } from "react";
import img from "@/assets/img/services.webp";
import { signatureServices } from "@/utils/data";
import { Button } from "@/components/Button";
import Link from "next/link";

export const SignatureServices: FC = () => (
  <section id="services">
    <h2>Signature Services</h2>
    <div className="content">
      <Image aria-hidden src={img} alt="Signature Services" />
      <article className="card">
        {signatureServices.map((service) => (
          <div key={service.label}>
            <h4>{service.label}</h4>
            <p>{service.desc}</p>
          </div>
        ))}
        <Link href="#contact">
          <Button label="Ask for price" />
        </Link>
      </article>
    </div>
  </section>
);
