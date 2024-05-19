import { useOutletContext } from "react-router-dom";
import { UseSecurityContextType } from "../types";

export default function useSecurity() {
  return useOutletContext<UseSecurityContextType>();
}
