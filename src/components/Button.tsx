import type { FC } from "react";

interface Props {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: HTMLButtonElement["type"];
}

export const Button: FC<Props> = ({ label, onClick, disabled, type }) => (
  <button className="button" onClick={onClick} disabled={disabled} type={type}>
    {label}
  </button>
);
