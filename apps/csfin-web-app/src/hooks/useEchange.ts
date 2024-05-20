import { useOutletContext } from "react-router-dom";
import { UseExchangeContextType } from "../types";

export default function useExchange() {
  return useOutletContext<UseExchangeContextType>();
}
