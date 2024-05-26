import { ReactNode } from "react";

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
      <span>Loading...</span>
    </div>
  ) : (
    <div className="p-3">{children}</div>
  );
};
