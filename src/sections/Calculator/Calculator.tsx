import type { FC } from "react";
import styles from "./calculator.module.scss";

export const Calculator: FC = () => (
  <div id="calculator" className={styles.calculator}>
    <h2>Calculate your next event</h2>
  </div>
);
