import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/16/solid";
import { twMerge } from "tailwind-merge";

interface ComparisonIconProps {
  current: number;
  previous: number;
  className?: string;
}

export const ComparisonIcon = ({
  current,
  previous,
  className,
}: ComparisonIconProps) => {
  if (current > previous) {
    return (
      <ArrowUpRightIcon className={twMerge("text-green-500", className)} />
    );
  }

  if (current < previous) {
    return (
      <ArrowDownRightIcon className={twMerge("text-red-500", className)} />
    );
  }

  return <ArrowRightIcon className={twMerge("text-neutral-500", className)} />;
};
