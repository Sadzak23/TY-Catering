import { popins } from "@/app/layout";
import type { FC } from "react";

interface Props {
  label: string;
  onClick?: () => void;
}

export const Button: FC<Props> = ({ label, onClick }) => (
  <button className={popins.className} onClick={onClick}>
    {label}
  </button>
);
