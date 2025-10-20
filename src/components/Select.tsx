import type { FC } from "react";

interface Props {
  label: string;
  options: { value: string | number; label: string }[];
  required?: boolean;
  name?: string;
  value?: string | number;
  placeholder?: string;
  className?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export const Select: FC<Props> = ({
  label,
  options,
  required,
  name,
  value,
  placeholder,
  className,
  onChange,
}) => (
  <label title={label}>
    {label}
    <select
      name={name ?? label.toLowerCase()}
      required={required}
      value={value ?? ""}
      onChange={onChange}
      className={className}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);
