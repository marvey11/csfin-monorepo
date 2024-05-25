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
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleGroupingChanged}
        className={twMerge("align-middle", `w-${size} h-${size}`)}
      />
      <span className="align-middle">{label}</span>
    </label>
  );
};

export { Checkbox };
