import { ChangeEvent, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { BasicComponentProps } from "../types";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends BasicComponentProps {
  options: string[] | SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

const Select = ({
  options,
  value,
  onChange,
  className,
  ...rest
}: SelectProps) => {
  const selectOptions = useMemo(
    () =>
      options.map((option) =>
        typeof option === "string" ? { label: option, value: option } : option
      ),
    [options]
  );

  const handleSelectionChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleSelectionChanged}
      className={twMerge(
        "w-fit border border-neutral-400 px-2 py-1 rounded-md cursor-pointer shadow-md outline-none",
        className
      )}
      {...rest}
    >
      {selectOptions.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export { Select };
export type { SelectOption };
