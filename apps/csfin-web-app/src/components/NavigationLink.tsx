import { cn } from "@csfin-monorepo/core-ui";
import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavigationLinkProps {
  to: string;
  children: ReactNode;
}

export const NavigationLink = ({ to, children }: NavigationLinkProps) => {
  const location = useLocation();

  return (
    <NavLink
      to={to}
      className={cn("hover:bg-slate-500 flex items-center h-full px-3", {
        "bg-slate-700": location.pathname === to,
      })}
    >
      {children}
    </NavLink>
  );
};
