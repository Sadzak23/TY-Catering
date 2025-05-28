import type { FC } from "react";

interface Props {
  label: string;
  onClick?: () => void;
}

export const Button: FC<Props> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);
