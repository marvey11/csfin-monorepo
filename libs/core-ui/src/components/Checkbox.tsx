import { ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import { BasicComponentProps } from "../types";

interface CheckboxProps extends BasicComponentProps {
  label: string;
  size?: number;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({
  id,
  label,
  size = 4,
  checked,
  onChange,
  title,
  className,
}: CheckboxProps) => {
  const handleGroupingChanged = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <label
      title={title}
      className={twMerge(
        "inline-flex gap-1 items-center w-fit whitespace-nowrap",
        className
      )}
    >
      {/* for some reason the h- and w- Tailwind values in the input's class
      names using the provided size disappear after restarting the dev server;
      using style instead */}

      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleGroupingChanged}
        className="align-middle"
        style={{
          height: `calc(${size / 4}rem)`,
          width: `calc(${size / 4}rem)`,
        }}
      />
      <span className="align-middle">{label}</span>
    </label>
  );
};

export { Checkbox };
