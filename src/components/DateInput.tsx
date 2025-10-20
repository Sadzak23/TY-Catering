import type { FC } from "react";

interface Props {
  label?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export const DateInput: FC<Props> = ({
  label,
  name,
  required,
  disabled,
  min,
  value,
  onChange,
}) => (
  <label title={label}>
    {label}
    <input
      type="date"
      name={name ?? label?.toLowerCase()}
      required={required}
      disabled={disabled}
      min={min}
      value={value ?? ""}
      onChange={onChange}
    />
  </label>
);
