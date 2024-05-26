import { ReactNode } from "react";
import { Spinner } from "./Spinner";

interface DataPageContainerProps {
  isLoading: boolean;
  children: ReactNode;
}

export const DataPageContainer = ({
  isLoading,
  children,
}: DataPageContainerProps) => {
  return isLoading ? (
    <div className="flex h-[calc(100vh-var(--navbar-height))] items-center justify-center">
      <Spinner />
    </div>
  ) : (
    <div className="p-3">{children}</div>
  );
};
