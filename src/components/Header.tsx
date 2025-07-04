import Image from "next/image";
import { FC } from "react";
import logo from "../assets/img/tyc.svg";
// import { Button } from "@/components/Button";

export const Header: FC = () => {
  const navItems = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT US", href: "#about" },
    // { name: "PORTFOLIO", href: "#portfolio" },
    // { name: "MENU", href: "/menu" },
    // { name: "SIGNATURE SERVICES", href: "/service" },
    { name: "CONTACT", href: "#contact" },
  ];
  return (
    <header>
      <Image src={logo} alt="TYC" height={38} priority />
      <nav>
        {navItems.map((item) => (
          <a key={item.name} href={item.href}>
            {item.name}
          </a>
        ))}
      </nav>
      {/* <Button label="Book a Call" /> */}
    </header>
  );
};
