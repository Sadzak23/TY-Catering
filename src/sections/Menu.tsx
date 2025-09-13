import { Fragment, type FC } from "react";
import menuImg from "@/assets/img/menu.webp";
import dinnerImg from "@/assets/img/dinner-packages.webp";
import cocktailImg from "@/assets/img/cocktail-packages.webp";
import Image from "next/image";
import { cocktailItems, dinnerItems, menuItems } from "@/utils/data";

export const Menu: FC = () => (
  <section id="menu">
    <h2>{`Menu`}</h2>
    <div className="items">
      <div className="item">
        <Image aria-hidden src={menuImg} alt="Menu" />
        <div className="item-content menu-content">
          <h4 className="label">Menu</h4>
          <p className="price">starting @</p>
          {menuItems.map((item) => (
            <Fragment key={item.label}>
              <div className="label">
                <p>{item.label}</p>
                {item.desc && <span>{item.desc}</span>}
              </div>
              <p className="price">{item.price}</p>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="item">
        <Image aria-hidden src={dinnerImg} alt="Dinner Packages" />
        <div className="item-content">
          <h4 className="label">Dinner Packages</h4>
          <div />
          {dinnerItems.map((item) => (
            <Fragment key={item.label}>
              <div className="label">
                <p className="bold">{item.label}</p>
                {item.desc && <p>{item.desc}</p>}
              </div>
              <p className="price">{item.price}</p>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="item">
        <Image aria-hidden src={cocktailImg} alt="Cocktail Packages" />
        <div className="item-content">
          <h4 className="label">Cocktail Packages</h4>
          <div />
          {cocktailItems.map((item) => (
            <Fragment key={item.label}>
              <div className="label">
                <p className="bold">{item.label}</p>
                {item.desc && <p>{item.desc}</p>}
              </div>
              <p className="price">{item.price}</p>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  </section>
);
